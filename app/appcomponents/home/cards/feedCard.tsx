"use client";

import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
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
    <div className="bg-white rounded-lg overflow-hidden max-w-lg mx-auto">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div>
          <p className="font-medium text-md">{userName}</p>
          <p className="text-sm text-gray-500">Watched {movieTitle}</p>
        </div>
      </div>

      <div className="w-full h-80 bg-gray-200 relative overflow-hidden rounded-md">
        
      </div>

      <div className="px-4 py-3">
        <div className = "flex justify-between items-center mb-2">
          <div className = "flex gap-2">
            <Heart />
          <MessageCircle />
          </div>
          <Bookmark />

        </div>
        <h3 className="font-medium text-sm mb-2">{movieTitle}</h3>
        <p className="text-sm text-gray-700 mb-3">{userNote}</p>
        
      </div>      
    </div>
  );
};

export default FeedCard;
