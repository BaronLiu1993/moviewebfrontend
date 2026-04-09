"use client";

import React, { useEffect, useState } from "react";
import FeedCard from "../cards/feedCard";
import RatingDialog from "../rating/ratingDialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, Send } from "lucide-react";

type FeedItem = {
  tmdb_id: number;
  title: string;
  genre_ids: number[];
  release_year: number;
  poster_url: string;
};

type ListItem = {
  list_id: string;
  name: string;
};

interface WatchlistSectionProps {
  name: string;
  listId: string;
  token: string;
  lists: ListItem[];
}

const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  name,
  listId,
  token,
  lists,
}) => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/list/${listId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || data.films || data.data || []);
      })
      .catch((err) => console.error("Failed to fetch watchlist:", err))
      .finally(() => setLoading(false));
  }, [listId, token]);

  console.log("Watchlist items:", items);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-[200px] bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700">
        <div className="absolute top-4 right-4 flex items-center bg-white rounded-lg shadow-sm">
          <button className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-800 transition cursor-pointer items-center gap-1 flex hover:bg-zinc-100 rounded-md">
            <Send className = "w-4 h-4" />
            Share
          </button>
          <Separator orientation="vertical" className="h-5" />
          <button className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-800 transition cursor-pointer flex items-center gap-1 hover:bg-zinc-100 rounded-md">
            <Link className = "w-4 h-4" />
            Collaborate
          </button>
        </div>
      </div>
      <div className="px-20 mt-10">
        <h1 className="text-4xl font-bold">{name}</h1>
        {loading ? (
          <Skeleton className="h-5 w-24 mt-2" />
        ) : (
          <p className="text-muted-foreground mt-2">
            {items.length} {items.length === 1 ? "title" : "titles"}
          </p>
        )}
      </div>
      <div
        className="flex flex-wrap gap-4 justify-center mx-auto mt-8"
        style={{ maxWidth: "fit-content" }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="flex flex-col rounded-xl overflow-hidden w-[250px]">
                <Skeleton className="rounded-lg w-[250px] h-[375px]" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <div className="flex gap-1">
                    <Skeleton className="rounded-full h-5 w-16" />
                    <Skeleton className="rounded-full h-5 w-14" />
                  </div>
                </div>
              </div>
            ))
          : items.map((item) => (
              <div key={item.tmdb_id} className="animate-fade-in">
                <RatingDialog
                  title={item.title}
                  tmdb_id={item.tmdb_id}
                  genre_ids={item.genre_ids}
                  release_year={item.release_year}
                  token={token}
                >
                  <div>
                    <FeedCard
                      tmdb_id={item.tmdb_id}
                      title={item.title}
                      genre_ids={item.genre_ids}
                      release_year={item.release_year}
                      photo_url={item.poster_url}
                      token={token}
                      lists={lists}
                    />
                  </div>
                </RatingDialog>
              </div>
            ))}
      </div>
    </div>
  );
};

export default WatchlistSection;
