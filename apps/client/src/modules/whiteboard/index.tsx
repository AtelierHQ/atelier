import { useRef, useState } from 'react';

import { Toolbar } from './components';
import { useCanvasConfig } from './hooks';
import { DrawingConfig, initDrawingConfig } from './types';

export const Whiteboard = () => {
  const [drawingConfig, setDrawingConfig] = useState<DrawingConfig>(initDrawingConfig);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasConfig = useCanvasConfig(canvasRef);

  return (
    <>
      <Toolbar activeShape={drawingConfig.toDraw} setToDraw={setDrawingConfig} />
      <canvas ref={canvasRef} className="block w-full h-full z-10 "></canvas>
    </>
  );
};
