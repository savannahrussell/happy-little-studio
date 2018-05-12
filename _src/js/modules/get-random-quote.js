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

export default function grabQuote($nodes) {

function grabInspiration() {
    var url = [window.location.protocol, '', window.location.host, 'quotes.json'].join('/');
    // console.log(url);
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(error) {
        console.log('yeah no quote');
        console.log(error);
      },
      success: function(result) {
        var arrayQ = result.quotes;

        // Give us some wisdom this day, Bob
        function load_quote(arrayQ) {
          var quoteArrayLength = arrayQ.length;

          console.log('length is' + quoteArrayLength);
        }
        load_quote(result);
      }
    });
  }

grabInspiration();
}