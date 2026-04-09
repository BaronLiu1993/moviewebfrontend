"use client";

import { Badge } from "@/components/ui/badge";
import HeartButton from "../rating/heartButton";
import BookmarkButton from "./bookmarkButton";
import Image from "next/image";


type ListItem = {
  list_id: string;
  name: string;
};

type FeedItemProps = {
  tmdb_id: number;
  title: string;
  genre_ids: number[];
  release_year: number;
  photo_url?: string;
  token: string;
  lists: ListItem[];
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
  token,
  lists,
}: FeedItemProps) => {
  return (
    <div className="font-figtree cursor-pointer flex flex-col justify-center items-center rounded-xl overflow-hidden w-[250px] hover:bg-zinc-50 hover:scale-102 transition">
      <div>
        <div className="relative">
          <div className="absolute top-2 right-2">
            <BookmarkButton tmdb_id={tmdb_id} title={title} genre_ids={genre_ids} poster_url={photo_url ?? ""} lists={lists} token={token} />
          </div>
          <Image
            className="rounded-t-xl object-cover rounded-lg"
            style={{ width: "auto", height: "auto" }}
            src={photo_url ?? "/placeholder.jpg"}
            alt={title}
            width={250}
            height={375}
          />
        </div>
        <div className="p-3 space-y-2">
          <div className = "flex justify-between items-center">
            <h1 className="font-semibold text-lg leading-tight">{title}</h1>
            <HeartButton tmdb_id={tmdb_id} genre_ids={genre_ids} film_name={title} token={token} />
          </div>
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
