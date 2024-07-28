import { RefObject, useEffect, useState } from 'react';
import { CanvasConfig } from '../types';

function useCanvasConfig(canvasRef: RefObject<HTMLCanvasElement>) {
  const [canvasConfig, setCanvasConfig] = useState<CanvasConfig>({
    context: null,
    canvasHeight: 0,
    canvasWidth: 0,
  });

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef?.current;

    if (canvas) {
      const context = canvas.getContext('2d');
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;

      setCanvasConfig({
        context,
        canvasHeight: canvas.height,
        canvasWidth: canvas.width,
      });
    }
  }, []);

  return canvasConfig;
}

export default useCanvasConfig;
