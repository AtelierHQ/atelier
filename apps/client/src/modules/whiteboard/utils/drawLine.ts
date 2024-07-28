import { Shape, ShapesEnum } from '../types';

function drawLine(context: CanvasRenderingContext2D, line: Shape<ShapesEnum.Line>) {
  const { coordinates } = line;
  const { x1, x2, y1, y2 } = coordinates[coordinates.length - 1];

  var headlen = 10;
  var angle = Math.atan2(y2 - y1, x2 - x1);
  context.save();
  context.strokeStyle = 'black';

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();

  //arrow head
  context.beginPath();
  context.moveTo(x2, y2);
  context.lineTo(
    x2 - headlen * Math.cos(angle - Math.PI / 7),
    y2 - headlen * Math.sin(angle - Math.PI / 7),
  );

  context.lineTo(
    x2 - headlen * Math.cos(angle + Math.PI / 7),
    y2 - headlen * Math.sin(angle + Math.PI / 7),
  );

  context.lineTo(x2, y2);
  context.lineTo(
    x2 - headlen * Math.cos(angle - Math.PI / 7),
    y2 - headlen * Math.sin(angle - Math.PI / 7),
  );

  context.stroke();
  context.restore();
}

export default drawLine;
