import { useRef, useState } from 'react';

import { Toolbar } from './components';
import { DrawingConfig, initDrawingConfig } from './types';

export const Whiteboard = () => {
  const [drawingConfig, setDrawingConfig] = useState<DrawingConfig>(initDrawingConfig);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <Toolbar activeShape={drawingConfig.toDraw} setToDraw={setDrawingConfig} />
      <canvas ref={canvasRef}></canvas>
    </>
  );
};
