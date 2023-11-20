import React from "react";
import { FaStar } from "react-icons/fa";
interface StarRatingProps {
  rating: number;
  maxRating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, index) => (
        <span
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
