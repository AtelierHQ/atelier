function drawGrid(context: CanvasRenderingContext2D, width: number, height: number) {
  context.save();
  context.fillStyle = '#fdfdfd'; // Light gray background
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#dcdcdc'; // Black dots

  const gridSize = 40; // Distance between dots

  for (let x = 4; x < width; x += gridSize) {
    for (let y = 4; y < height; y += gridSize) {
      context.beginPath();
      context.arc(x, y, 2, 0, 2 * Math.PI);
      context.fill();
    }
  }
  context.restore();
}

export default drawGrid;
