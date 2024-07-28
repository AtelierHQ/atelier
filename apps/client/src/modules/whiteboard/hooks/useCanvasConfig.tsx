import { RefObject, useEffect, useState } from 'react';

import { CanvasConfig } from '../types';
import { drawGrid } from '../utils';

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

      canvas.style.width = '100%';
      canvas.style.height = '100%';

      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;

      context?.scale(2, 2);

      if (context) {
        drawGrid(context, canvas.width, canvas.height);
      }

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
