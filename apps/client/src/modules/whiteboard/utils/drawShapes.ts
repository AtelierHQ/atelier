import { MutableRefObject } from 'react';
import { InitCoord, LineCoord, RectangleCoord, Shape, ShapesEnum } from '../types';
import drawLine from './drawLine';
import drawRectangle from './drawRectangle';
import getCanvasCoordinates from './getCanvasCoordinates';

function drawShapes(
  context: CanvasRenderingContext2D,
  toDraw: ShapesEnum,
  event: MouseEvent,
  initCoord: InitCoord,
  shapeId: string,
  movedShape: MutableRefObject<Shape<ShapesEnum>> | MutableRefObject<undefined>,
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
) {
  const { x: x1, y: y1 } = initCoord;
  const coords = getCanvasCoordinates(event, canvasRef);

  // console.log('mouse move:', rect);
  switch (toDraw) {
    case ShapesEnum.Rectangle: {
      // const xCoord = x2 - rect.left;
      // const yCoord = y2 - rect.top;

      const coordinates: Array<RectangleCoord> = [
        {
          x1,
          y1,
          width: coords.x - x1,
          height: coords.y - y1,
        },
      ];

      const rectangle: Shape<ShapesEnum.Rectangle> = {
        id: shapeId,
        type: ShapesEnum.Rectangle,
        coordinates,
      };

      drawRectangle(context, rectangle);

      if (movedShape) movedShape.current = rectangle;

      break;
    }

    case ShapesEnum.Line: {
      const { x: x2, y: y2 } = coords;
      const coordinates: Array<LineCoord> = [{ x1, x2, y1, y2 }];

      const line: Shape<ShapesEnum.Line> = {
        id: shapeId,
        type: ShapesEnum.Line,
        coordinates,
      };

      drawLine(context, line);

      if (movedShape) movedShape.current = line;

      break;
    }

    default:
      break;
  }
}

export default drawShapes;
