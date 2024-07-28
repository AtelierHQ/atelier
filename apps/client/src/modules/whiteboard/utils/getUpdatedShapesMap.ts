import { PenCoordinate, RectangleCoord, RedoShape, Shape, ShapesEnum, ShapesMap } from '../types';
import { isRedoShapePen } from './typeGuards';

function getUpdatedShapesMap(redoShape: RedoShape, shapesMap: ShapesMap): ShapesMap {
  const shapesMapClone = new Map(shapesMap);
  const existingShape = shapesMapClone.get(redoShape.id) as Shape<ShapesEnum>;

  if (isRedoShapePen(redoShape)) {
    const penCoordinates = redoShape.coordinate as PenCoordinate[];
    shapesMapClone.set(redoShape.id, {
      ...redoShape,
      coordinates: penCoordinates,
    });
  } else {
    shapesMapClone.set(redoShape.id, {
      ...redoShape,
      coordinates: existingShape
        ? ([...existingShape.coordinates, redoShape.coordinate] as RectangleCoord[])
        : ([redoShape.coordinate] as RectangleCoord[]),
    });
  }

  return shapesMapClone;
}

export default getUpdatedShapesMap;
