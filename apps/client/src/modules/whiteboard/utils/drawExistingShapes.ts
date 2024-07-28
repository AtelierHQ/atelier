import { CanvasConfig, Shape, ShapesEnum } from '../types';
import drawGrid from './drawGrid';
import drawLine from './drawLine';
import drawRectangle from './drawRectangle';
import drawText from './drawText';
import { isLine, isPen, isRectangle, isText } from './typeGuards';

function drawExistingShapes(
  shapesMap: Map<string, Shape<ShapesEnum>>,
  canvasConfig: CanvasConfig,
  ignoreShapeId?: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, canvasWidth, canvasHeight } = canvasConfig;

  if (!context) return;

  drawGrid(context, canvasWidth, canvasHeight);

  for (const [_, shape] of shapesMap) {
    if (shape.id === ignoreShapeId) {
      // ignore re-drawing the moving shape.
      continue;
    }

    switch (shape.type) {
      case ShapesEnum.Rectangle: {
        if (isRectangle(shape)) {
          drawRectangle(context, shape);
        }
        break;
      }

      case ShapesEnum.Line: {
        if (isLine(shape)) {
          drawLine(context, shape);
        }
        break;
      }

      case ShapesEnum.Text: {
        if (isText(shape)) {
          const { x, y } = shape.coordinates[shape.coordinates.length - 1];
          drawText(context, shape.text, x, y);
        }

        break;
      }

      case ShapesEnum.Pen: {
        if (isPen(shape)) {
          const { coordinates } = shape;
          const { x, y } = coordinates[0];
          context.beginPath();
          context.moveTo(x, y);

          for (let i = 1; i < coordinates.length; i++) {
            const { x, y } = coordinates[i];
            context.lineTo(x, y);
          }
          context.stroke();
        }
        break;
      }

      default:
        break;
    }
  }
}

export default drawExistingShapes;
