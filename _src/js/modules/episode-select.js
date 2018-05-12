var $ = require('jquery');

// parse a JSON array into something searchable

// After selecting an episode...

  // take a look at the episode number
  // find the color arrays
  // remove the pre-existing buttons
  // re-populate the buttons
    // with the right hex color value
    // and the display name
    // and the episode link so you can watch along

export default function episodeSelect($nodes) {

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
          var result = [];
          for (var i in obj) {
            console.log(i);
            console.log(i[0]);
            result.push(`<button class="palette-swatch js-swatch ${i}" data-color="${obj[i][0]}">${obj[i][1]}</button>`);
          }
          return result;
        }
        var colorArray = load_palette(colorsUsed);
        $('.js-palette').html(colorArray);

        // And get ready to paint
        $paintAlongLink.attr('href', epLink);
      }
    });
  }

  $('.js-episode-select').on('change', function(event) {
    var selectedEpCode = event.target.value;
    grabEpisodeData(selectedEpCode);
  });

}