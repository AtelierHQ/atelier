import { MutableRefObject } from 'react';
import { ShapesMap } from '../types';

function canUndo(
  shapes: ShapesMap,
  context: CanvasRenderingContext2D | null,
  activeShapeIds: MutableRefObject<string[]>,
) {
  return shapes.size && context && activeShapeIds.current.length;
}

export default canUndo;
