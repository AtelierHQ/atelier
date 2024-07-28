import { CanvasConfig, ShapesMap } from '../types';
import drawExistingShapes from './drawExistingShapes';

function redrawCanvas(shapes: ShapesMap, canvasConfig: CanvasConfig) {
  const { canvasHeight, canvasWidth, context } = canvasConfig;
  context?.clearRect(0, 0, canvasWidth, canvasHeight);
  drawExistingShapes(shapes, canvasConfig);
}

export default redrawCanvas;
