import React from 'react';
import { Heart, Eye } from 'lucide-react';

interface AssessmentCardProps {
  title: string;
  images: string[];
  level: string;
  type: string;
  description: string;
  rating: number;
  likes: number;
  views: number;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  title,
  images,
  level,
  type,
  description,
  rating,
  likes,
  views,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 max-w-xs w-full">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 mb-3">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Assessment"
            className="w-full h-20 object-cover rounded-lg border border-gray-200"
          />
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">{level}</span>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">{type}</span>
      </div>
      <div className="flex items-center gap-4 mb-1">
        <div className="flex items-center gap-1 text-yellow-500">
          <Heart fill="#FFC700" className="w-4 h-4" />
          <span className="text-xs font-medium text-gray-700">{likes}</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
          <Eye className="w-4 h-4" />
          <span className="text-xs font-medium text-gray-700">{views}k</span>
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-1">{description}</div>
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default AssessmentCard; 