let MOUSE_LEFT = 1,
  MOUSE_RIGHT = 3;
let clicks = 0;


canvas.addEventListener('mousedown', function(e) {
  let x = e.clientX - canvas.offsetLeft,
    y = e.clientY - canvas.offsetTop;

  // hit test
  let modelCoordinates = viewToModel(x, y);

  if (e.which === MOUSE_LEFT) {
    clicks += 1;
    //console.log(clicks);
    openBlock(modelCoordinates.x, modelCoordinates.y)
  } else if (e.which === MOUSE_RIGHT) {flagBlock(modelCoordinates.x, modelCoordinates.y)}

  render();

  return false;
});

canvas.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
}, false);

//code from: https://www.youtube.com/watch?v=LRnnNInjmN0