/**
 * Elements
 *
 * Used to share common elements across all modules,
 * in order to avoid multiple DOM queries.
 *
 * import { $body } from 'constants/elements';
 * $body.addClass('something');
 */

export const $win = $(window);
export const $doc = $(document);
export const $html = $('html');
export const $body = $('body');