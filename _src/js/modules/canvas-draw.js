
export default function draw($nodes) {

  const canvas = document.querySelector('#draw');
  const ctx = canvas.getContext('2d');
  var isDrawing, lastX, lastY;
  ctx.strokeStyle = '#000000';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 25;
  ctx.globalAlpha = 1;

  function draw(e) {
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

  }

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  $('body').on('click tap touch', '.js-swatch', function(event) {
    $('.js-swatch').removeClass('is-active');
    ctx.strokeStyle = event.target.dataset.color;
    $(this).addClass('is-active');
  });

  $('.js-tool-brushwidth').on('change', function(event) {
    ctx.lineWidth = this.value;
  })

  $('.js-tool-coloropacity').on('change', function(event) {
    ctx.globalAlpha = this.value / 100;
  })


  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);
}