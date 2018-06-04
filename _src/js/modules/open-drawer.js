var $ = require('jquery');

export default function openDrawer($nodes) {

  $('body').on('click tap touch', '.js-drawer-opener', function(event) {

    var targetDrawer = $(this).data('opens'),
    target = document.getElementsByClassName(targetDrawer)[0];
    $(target).toggleClass('is-inView');

  });

  $('body').on('click tap touch', '.js-drawer-closer', function(event) {

    var targetDrawer = $(this).data('closes'),
    target = document.getElementsByClassName(targetDrawer)[0];
    $(target).removeClass('is-inView');

  });

}