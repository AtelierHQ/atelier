import { useState } from 'react';
import { cn } from '../../lib/utils';

type Props = {
  rating?: number;
  maxRating?: number;
  showValue?: boolean;
  onRatingChange?: (newRating: number) => void;
};

const Rating = ({ rating, maxRating = 5, showValue = false, onRatingChange }: Props) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const dots = Array.from({ length: maxRating }, (_, index) => ({
    filled: index < (hoverRating || rating || 0),
    hovered: index < hoverRating,
  }));

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="flex items-center space-x-1">
        {showValue && rating !== undefined ? (
          <span className="text-lg font-semibold text-blue-500">{rating.toFixed(1)}</span>
        ) : (
          dots.map((dot, index) => (
            <div
              key={index}
              className={cn(
                'w-4 h-4 rounded-full cursor-pointer transition-all duration-200 ease-in-out',
                dot.filled ? 'bg-blue-500' : 'bg-gray-300',
                dot.hovered && 'transform scale-110',
              )}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export { Rating };
