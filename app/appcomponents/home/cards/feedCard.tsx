"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FeedCardProps {
  id: number;
  movieTitle: string;
  sceneImage: string;
  userNote: string;
  initialLikes: number;
  initialComments: number;
  userName: string;
  userAvatar?: string;
}

const FeedCard = ({
  id,
  movieTitle,
  sceneImage,
  userNote,
  initialLikes,
  initialComments,
  userName,
  userAvatar,
}: FeedCardProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(initialComments);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-lg mx-auto">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div>
          <p className="font-medium text-sm">{userName}</p>
          <p className="text-xs text-gray-500">Watched {movieTitle}</p>
        </div>
      </div>

      <div className="w-full h-80 bg-gray-200 relative overflow-hidden">
        {sceneImage ? (
          <Image
            src={sceneImage}
            alt="Scene"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <p className="text-gray-600">{movieTitle}</p>
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <h3 className="font-medium text-sm mb-2">{movieTitle}</h3>
        <p className="text-sm text-gray-700 mb-3">{userNote}</p>
      </div>

      {/* Engagement */}
      <div className="px-4 py-2 border-t border-gray-100 flex justify-between text-xs text-gray-600 mb-2">
        <span>{likes} likes</span>
        <span>{comments} comments</span>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex gap-4 justify-around">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 py-2 px-4 rounded-md transition ${
            isLiked
              ? "text-red-500 bg-red-50"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
          <span className="text-xs">Like</span>
        </button>
        <button className="flex items-center gap-2 py-2 px-4 rounded-md text-gray-600 hover:bg-gray-100 transition">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs">Comment</span>
        </button>
        <button className="flex items-center gap-2 py-2 px-4 rounded-md text-gray-600 hover:bg-gray-100 transition">
          <Share2 className="w-4 h-4" />
          <span className="text-xs">Share</span>
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
