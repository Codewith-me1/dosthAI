import React from "react";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";

interface CardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  textColor?: string;
  category: string;
  type: "story" | "activity";
  author: "BCBA Created" | string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  rating,
  textColor = "text-gray-800",
  type,
  onClick,
  author,
}) => {
  return (
    <div className="w-full max-w-[20rem] cursor-pointer" onClick={onClick}>
      <div className="relative w-full rounded-xl overflow-hidden bg-white">
        <Image
          src={image}
          alt={title}
          width={500}
          height={200}
          className="object-cover w-full h-[180px]"
        />
      </div>

      <div className="mt-3">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-[#2E74FF]  py-2 rounded-full text-[13px] ">
            {type.toUpperCase()}
          </div>
          <div className="flex space-x-2">
            <div className=" rounded-full p-1.5 flex items-center space-x-1">
              <Heart fill="#FFC700" className="text-[#FFC700] h-4 w-4" />
              <span className="text-xs font-medium">23</span>
            </div>
            <div className=" rounded-full p-1.5 flex items-center space-x-1">
              <Eye className="text-[#FFC700] h-4 w-4" />
              <span className="text-xs font-medium">1k</span>
            </div>
          </div>
        </div>
        <h3 className={`text-md font-medium mb-1.5 ${textColor} line-clamp-2`}>
          {title}
        </h3>
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-3.5 h-3.5 ${
                index < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <h3 className="text-sm text-purple-300 "> {author}</h3>
      </div>
    </div>
  );
};

export default Card;
