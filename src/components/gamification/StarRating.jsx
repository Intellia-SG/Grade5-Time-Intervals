import React from 'react';
import { Star } from 'lucide-react';

export function StarRating({ stars = 0, maxStars = 3, size = 'sm' }) {
  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size] || 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, idx) => {
        const isFilled = idx < stars;
        return (
          <Star
            key={idx}
            className={`${iconSize} transition-all ${
              isFilled ? 'fill-amber-400 text-amber-400 drop-shadow' : 'fill-slate-800 text-slate-700'
            }`}
          />
        );
      })}
    </div>
  );
}
