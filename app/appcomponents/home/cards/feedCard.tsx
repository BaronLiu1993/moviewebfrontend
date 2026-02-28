"use client";

import { Badge } from "@/components/ui/badge";
import { Bookmark, Check } from "lucide-react";
import Image from "next/image";

import React from "react";

type FeedItemProps = {
  tmdb_id: number;
  title: string;
  genre_ids: number[];
  release_year: number;
  photo_url?: string;
};

const TV_GENRE_MAP: { [key: number]: string } = {
  10759: "action adventure",
  16: "animation",
  35: "comedy",
  80: "crime",
  18: "drama",
  10751: "family",
  9648: "mystery",
  10765: "scifi fantasy",
};

const FeedCard = ({
  tmdb_id,
  title,
  genre_ids,
  release_year,
  photo_url,
}: FeedItemProps) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  return (
    <div className="font-figtree cursor-pointer flex flex-col justify-center items-center rounded-xl overflow-hidden w-[250px] hover:bg-zinc-50 hover:scale-102 transition">
      <div>
        <div className="relative">
          {isBookmarked ? (
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(false);
              }}
              className="absolute top-2 right-2 text-sm text-white bg-yellow-600 rounded-lg"
            >
              <Bookmark />
              Bookmark
            </Badge>
          ) : (
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(true);
              }}
              className="absolute top-2 right-2 text-sm text-white bg-green-600 rounded-lg"
            >
              <Check />
              Saved
            </Badge>
          )}
          <Image
            className="rounded-t-xl object-cover rounded-lg"
            src={photo_url ?? "/placeholder.jpg"}
            alt={title}
            width={250}
            height={375}
          />
        </div>
        <div className="p-3 space-y-2">
          <h1 className="font-semibold text-lg leading-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{release_year}</p>

          <div className="flex flex-wrap gap-1">
            {genre_ids.map((id) =>
              TV_GENRE_MAP[id] ? (
                <Badge key={id} variant="secondary" className="text-xs">
                  {TV_GENRE_MAP[id]}
                </Badge>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
