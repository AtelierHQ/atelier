import { RefObject } from 'react';
import { InitCoord } from '../types';

function getCanvasCoordinates(
  event: MouseEvent,
  canvasRef: RefObject<HTMLCanvasElement>,
): InitCoord {
  const canvas = canvasRef.current as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export default getCanvasCoordinates;
