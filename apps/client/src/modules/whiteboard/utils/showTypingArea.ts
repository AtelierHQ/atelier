import { RefObject } from 'react';
import getCanvasCoordinates from './getCanvasCoordinates';

function getTypingArea(event: MouseEvent, canvasRef: RefObject<HTMLCanvasElement>) {
  // const x1 = event.offsetX;
  // const y1 = event.offsetY + 80;

  const { x, y } = getCanvasCoordinates(event, canvasRef);

  const textArea = document.createElement('span');
  textArea.setAttribute('role', 'textbox');
  textArea.setAttribute('contenteditable', '');
  textArea.style.position = 'absolute';
  textArea.style.top = `${y + 120}px`;
  textArea.style.left = `${x + 295}px`;
  textArea.style.display = 'inline-block';
  textArea.style.minWidth = `16px`;
  textArea.style.minHeight = '16px';
  textArea.style.outline = 'none';
  textArea.style.zIndex = '10';
  textArea.style.font = "1rem 'Fira Sans', sans-serif";
  const body = document.querySelector('body');
  body?.appendChild(textArea);

  setTimeout(() => {
    textArea.focus();
  }, 200);

  return { typingArea: textArea, x1: x - 2, y1: y };

  // return { typingArea: textArea, x1: event.offsetX - 3, y1: event.offsetY + 2 };
}

export default getTypingArea;
