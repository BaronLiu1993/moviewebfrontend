"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
  return (
    <div className="font-figtree hover:bg-gray-200 flex justify-center border-2 p-1 rounded-xl shadow-sm overflow-hidden">
      <div className = "hover:bg-gray-200">
        <div>
          <Image
            className="rounded-lg"
            src={photo_url ?? "/placeholder.jpg"}
            alt={title}
            width={250}
            height={375}
          />
        </div>
        <div className="m-2">
          <h1 className="font-semibold text-lg leading-tight">{title}</h1>
          <p className="text-md text-muted-foreground mt-1">{release_year}</p>

          <div className="flex flex-wrap gap-1 mt-2">
            {genre_ids.map((id) => (
              <Badge key={id} className="text-sm">
                {TV_GENRE_MAP[id]}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
