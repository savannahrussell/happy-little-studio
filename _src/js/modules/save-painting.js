var $ = require('jquery');

export default function saveDrawing($nodes) {

  function downloadCanvas(link, canvasId, filename) {
    var canvasImg = document.getElementById(canvasId).toDataURL("image/png");
    link.href = canvasImg;
    link.download = filename;
  }

  $('.js-download').on('click tap touch', function(e) {
    downloadCanvas(this, 'draw', 'with-practice-comes-confidence.png');
  });

}