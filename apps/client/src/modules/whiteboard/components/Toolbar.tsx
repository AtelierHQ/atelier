import { MinusIcon, PencilIcon, SquareIcon, TypeIcon } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

import { DrawingConfig, ShapesEnum } from '../types';

type Props = {
  activeShape: ShapesEnum | undefined;
  setToDraw: Dispatch<SetStateAction<DrawingConfig>>;
};

const Toolbar: FC<Props> = ({ activeShape, setToDraw }) => {
  function setShapeToDraw(shape: ShapesEnum) {
    setToDraw((prev) => ({ ...prev, toDraw: shape }));
  }

  return (
    <div className="flex w-fit mx-auto rounded-md border-2 border-zinc-120 border-solid shadow-sm p-2 my-5  items-center gap-2">
      <button
        className={`rounded-md p-1.5 ${
          activeShape === ShapesEnum.Rectangle ? 'bg-blue-500' : 'hover:bg-blue-300'
        }`}
        onClick={() => setShapeToDraw(ShapesEnum.Rectangle)}
      >
        <SquareIcon className={` ${activeShape === ShapesEnum.Rectangle && 'text-white'}`} />
      </button>

      <button
        className={`rounded-md p-1.5 ${
          activeShape === ShapesEnum.Line ? 'bg-blue-500' : 'hover:bg-blue-300'
        }`}
        onClick={() => setShapeToDraw(ShapesEnum.Line)}
      >
        <MinusIcon className={` ${activeShape === ShapesEnum.Line && 'text-white'}`} />
      </button>

      <button
        onClick={() => setShapeToDraw(ShapesEnum.Text)}
        className={`rounded-md p-1.5 ${
          activeShape === ShapesEnum.Text ? 'bg-blue-500' : 'hover:bg-blue-300'
        }`}
      >
        <TypeIcon className={` ${activeShape === ShapesEnum.Text && 'text-white'}`} />
      </button>

      <button
        onClick={() => setShapeToDraw(ShapesEnum.Pen)}
        className={`rounded-md p-1.5 ${
          activeShape === ShapesEnum.Pen ? 'bg-blue-500' : 'hover:bg-blue-300'
        }`}
      >
        <PencilIcon className={` ${activeShape === ShapesEnum.Pen && 'text-white'}`} />
      </button>
    </div>
  );
};

export default Toolbar;
