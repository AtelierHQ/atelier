import { useRef, useState } from 'react';

import { Redo2Icon, Undo2Icon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Toolbar } from './components';
import { useCanvasConfig, useDrawShapes } from './hooks';
import {
  CanvasConfig,
  DrawingConfig,
  initDrawingConfig,
  LineCoord,
  PenCoordinate,
  RectangleCoord,
  RedoShape,
  Shape,
  ShapesEnum,
  ShapesMap,
} from './types';
import { canUndo, getUpdatedShapesMap, isNotPen, isPen } from './utils';
import redrawCanvas from './utils/redrawCanvas';

export const Whiteboard = () => {
  const [drawingConfig, setDrawingConfig] = useState<DrawingConfig>(initDrawingConfig);
  const [shapesMap, setShapesMap] = useState<ShapesMap>(new Map());
  const [redoShapes, setRedoShapes] = useState<Array<RedoShape>>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeShapeIds = useRef<string[]>([]);

  const canvasConfig = useCanvasConfig(canvasRef);

  useDrawShapes(
    canvasRef,
    drawingConfig,
    shapesMap,
    activeShapeIds,
    canvasConfig,
    setShapesMap,
    setDrawingConfig,
  );

  function undo(shapes: ShapesMap, canvasConfig: CanvasConfig) {
    console.log(' shapes: ', shapes);
    const { context } = canvasConfig;

    if (!canUndo(shapes, context, activeShapeIds)) return;
    const activeShapeId = activeShapeIds.current.pop() as string;
    const shapesMapClone = new Map(shapes);
    const activeShape = shapesMapClone.get(activeShapeId) as Shape<ShapesEnum>;

    let undoCoordinate: RectangleCoord | LineCoord | PenCoordinate[] | undefined;

    if (isPen(activeShape)) {
      undoCoordinate = [...activeShape.coordinates];
      activeShape.coordinates = [];
    } else if (isNotPen(activeShape)) {
      undoCoordinate = activeShape.coordinates.pop();
    }

    if (!undoCoordinate) return;

    if (!activeShape.coordinates.length) {
      shapesMapClone.delete(activeShapeId);
    }

    redrawCanvas(shapesMapClone, canvasConfig);
    updateRedoShape(undoCoordinate as RectangleCoord | LineCoord | PenCoordinate[], activeShape);
    setShapesMap(shapesMapClone);
  }

  function redo() {
    if (!redoShapes.length) return;

    const shapesToRedo = [...redoShapes];
    const redoShape = shapesToRedo.pop() as RedoShape;

    const shapesMapClone = getUpdatedShapesMap(redoShape, shapesMap);
    redrawCanvas(shapesMapClone, canvasConfig);
    setShapesMap(shapesMapClone);
    setRedoShapes(shapesToRedo);

    activeShapeIds.current.push(redoShape.id);
  }

  function updateRedoShape(
    undoCoordinates: RectangleCoord | LineCoord | PenCoordinate[],
    activeShape: Shape<ShapesEnum>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { coordinates, ...activeShapeWithouthCoordinates } = activeShape;

    const shape: RedoShape = {
      ...activeShapeWithouthCoordinates,
      coordinate: undoCoordinates,
    };

    setRedoShapes([...redoShapes, shape]);
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <Toolbar activeShape={drawingConfig.toDraw} setToDraw={setDrawingConfig} />
      <canvas ref={canvasRef} className="block w-full h-full z-10 relative"></canvas>

      <section className=" absolute right-4 bottom-6 flex gap-4 p-2 rounded-md z-20">
        <Button
          onClick={() => undo(shapesMap, canvasConfig)}
          className="bg-blue-600 hover:bg-blue-500"
        >
          <Undo2Icon />
        </Button>

        <Button onClick={() => redo()} className="bg-blue-600 hover:bg-blue-500">
          <Redo2Icon />
        </Button>
      </section>
    </div>
  );
};
