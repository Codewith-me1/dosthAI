import Image from 'next/image';
import { FaHeart, FaEye, FaStar } from 'react-icons/fa';

interface CardProps {
  title: string;
  imagePath: string;
  likes: number;
  views: number;
  rating: number;
  creator: string;
}

const   Card = ({ title, imagePath, likes, views, rating, creator }: CardProps) => {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative h-48 w-full">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-blue-500 font-bold uppercase text-sm">Story</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FaHeart className="text-yellow-400" />
              <span className="text-gray-600">{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEye className="text-gray-400" />
              <span className="text-gray-600">{views}</span>
            </div>
          </div>
        </div>
        
        <h2 className="font-bold text-xl mb-3 text-gray-800">{title}</h2>
        
        <div className="flex items-center space-x-1 mb-3">
          {renderStars()}
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <span className="text-purple-400">{creator} Created</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; 