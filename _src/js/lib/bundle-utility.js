import $ from 'jquery';

/**
 * Returns whether the given route matches the current window location
 * @param  {String} route A route to check
 * @return {Boolean}       Whether or not the route matches the current window location
 */
function getRouteResults(route) {
  const regularExpression = new RegExp(route);
  return regularExpression.test(window.location);
}

/**
 * Returns the matched DOM nodes for a given selector, if they exist
 * @param  {String} selector   A typical DOM selector
 * @return {NodeList|Boolean}  If results: NodeList. If not: false.
 */
function getSelectorResults(selector) {
  const $nodes = $(selector);

  return !$nodes.length ? false : $nodes;
}

/**
 * Fires the load actions of an filter and returns results if the criteria pass
 * @param  {Object} filter { selector (String), route (String), load (Function|Array) }
 * @return {Boolean|Object}      False if the not initialized.
 *                              filter object if initialized.
 *                              selectorResults added if selector is in the filter.
 */
function handleFilter(filter) {
  const { selector, route } = filter;
  const selectorResults = selector ? getSelectorResults(selector) : true;
  const routeResults = route ? getRouteResults(route) : true;

  if (!selectorResults || !routeResults) {
    return false;
  }

  if (selector) {
    return Object.assign({}, filter, { selectorResults });
  }

  return filter;
}

/**
 * Invokes the functions of a set of config objects if their criteria pass on load
 * @param  {Array} actionItems A set of configs.
 *                             { selector (String), route (String), load (Function|Array) }
 * @return {Array}             The results of what was initialized
 */
export function filterActions(actionItems) {
  const results = actionItems.reduce((_results, actionItem) => {
    const matchesActionItem = handleFilter(actionItem);

    return !matchesActionItem ? _results : [..._results, matchesActionItem];
  }, []);

  return results;
}

/**
 * Loops through a set of actionItem objects and calls
 * the functions/modules in their "load" arrays
 * @param  {Array} actionItems A list of objects. { load (Function|Array) }
 */
export function loadActions(actionItems) {
  actionItems.forEach(({ selectorResults, selector, load }) => {
    const actions = Array.isArray(load) ? load : [load];

    actions.forEach(action => {
      if (typeof action === 'function') {
        action(selectorResults, selector);
      } else {
        action.default(selectorResults, selector);
      }
    });
  });

  return actionItems;
}
