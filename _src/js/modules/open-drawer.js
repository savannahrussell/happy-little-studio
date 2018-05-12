var $ = require('jquery');

export default function openDrawer($nodes) {

  $('body').on('click tap touch', '.js-drawer-opener', function(event) {

    var targetDrawer = $(this).data('opens'),
    target = document.getElementsByClassName(targetDrawer)[0];
    $(target).toggleClass('is-inView');

  });

}