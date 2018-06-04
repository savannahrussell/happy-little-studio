var $ = require('jquery');

export default function blendColors($nodes) {

  var firstBlendColor = '#ffffff',
  secondBlendColor = '#000000',
  blendValue = 50;

  var blendedColor;

  // from https://gist.github.com/jedfoster/7939513
  function mix(color_1, color_2, weight) {
    function d2h(d) { return d.toString(16); }  // convert a decimal value to hex
    function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal

    weight = (typeof(weight) !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted

    var color = "#";

    // if our variables have a hash (they should)
    while(color_1.charAt(0) === '#') {
      color_1 = color_1.substr(1);
    }
    while(color_2.charAt(0) === '#') {
      color_2 = color_2.substr(1);
    }

    for(var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
      var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
          v2 = h2d(color_2.substr(i, 2)),

          // combine the current pairs from each source color, according to the specified weight
          val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

      while(val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit

      color += val; // concatenate val to our new color string
    }

    $('.js-blended-color').attr('data-color', color);

    document.documentElement.style.setProperty('--custom-blend-color', color);

    return color; // PROFIT!

  };

  $('body').on('click tap touch', '.first-blend-color .js-blend-swatch' , function(event) {
    $('.first-blend-color .js-blend-swatch').removeClass('is-active');
    $('.js-blended-color').removeClass('is-active');
    firstBlendColor = event.target.dataset.color;
    $(this).addClass('is-active');
    mix(firstBlendColor, secondBlendColor, blendValue);
  });

  $('body').on('click tap touch', '.second-blend-color .js-blend-swatch' , function(event) {
    $('.second-blend-color .js-blend-swatch').removeClass('is-active');
    $('.js-blended-color').removeClass('is-active');
    secondBlendColor = event.target.dataset.color;
    $(this).addClass('is-active');
    mix(firstBlendColor, secondBlendColor, blendValue);
  });

  $('.js-tool-blend').on('change', function(event) {
    $('.js-blended-color').removeClass('is-active');
    blendValue = this.value;
    mix(firstBlendColor, secondBlendColor, blendValue);
  });

}