var $ = require('jquery');

// parse a JSON array into something searchable

// First, get all of our color data in an object we can use

// After selecting an episode...

  // take a look at the episode number
  // find the color arrays
  // remove the pre-existing buttons
  // re-populate the buttons
    // with the right hex color value
    // and the display name
    // and the episode link so you can watch along

export default function episodeSelect($nodes) {

  var colorObject;

  function getColorData() {
    var url = [window.location.protocol, '', window.location.host, 'colors.json'].join('/');
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(error) {
        console.log('yeah no colors');
        console.log(error);
      },
      success: function(result) {
        // Let's get some data
        colorObject = result.colors;
        // console.log(colorObject);
        // console.log(Object.keys(colorObject));
      }
    });
  }

  function grabEpisodeData(epCode) {
    var url = [window.location.protocol, '', window.location.host, 'episodes.json'].join('/');
    // console.log(url);
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(error) {
        console.log('yeah no');
        console.log(error);
      },
      success: function(result) {
        // Let's get some data
        var episode = result.episodes[epCode],
        colorsUsed = episode.colors,
        epName = episode.name,
        epLink = episode.videoURL;

        var $paintAlongLink = $('.js-paintalong-link');

        // Load up our brush
        function load_palette(obj) {
          var palette = new Object;
          palette.paletteMarkup = [];
          palette.blendPaletteMarkup = [];
          for (var i = 0; i < colorsUsed.length; i++) {
            var colorVal = colorsUsed[i];
            palette.paletteMarkup.push(`<button class="palette-swatch js-swatch ${colorVal}" data-color="${colorObject[colorVal]["value"]}">${colorObject[colorVal]["fancyName"]}</button>`);
            palette.blendPaletteMarkup.push(`<button class="palette-blend-swatch js-blend-swatch ${colorVal}" data-color="${colorObject[colorVal]["value"]}"><span class="visually-hidden">${colorObject[colorVal]["fancyName"]}</span></button>`);
          }
          palette.paletteMarkup.push(`<button class="js-drawer-opener tool-button" data-opens="js-blend">Mix Colors</button>`);
          return palette;
        }
        var colorArray = load_palette(colorsUsed);
        $('.js-palette').html(colorArray.paletteMarkup);
        $('.js-blend-pots').html(colorArray.blendPaletteMarkup);

        // And get ready to paint
        $paintAlongLink.attr('href', epLink);
      }
    });
  }

  $(document).ready(function(){
    getColorData();
  });

  $('.js-episode-select').on('change', function(event) {
    var selectedEpCode = event.target.value;
    grabEpisodeData(selectedEpCode);
  });

}