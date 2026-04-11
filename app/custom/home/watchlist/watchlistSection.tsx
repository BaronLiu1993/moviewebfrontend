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
  createdAt: string;
  imageUrl?: string;
}

const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  name,
  listId,
  token,
  lists,
  createdAt,
  imageUrl,
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

  const handleRemoveItem = (tmdb_id: number) => {
    setItems((prev) => prev.filter((item) => item.tmdb_id !== tmdb_id));
  };

  return (
    <div className="flex font-figtree flex-col w-full">
      <div className="px-20 pt-8">
        <div className="flex items-end gap-6">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-48 h-48 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <div className="w-48 h-48 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
          )}
          <div>
            <p className="text-md text-muted-foreground">Film Board</p>
            <h1 className="text-6xl font-bold">{name}</h1>
            {loading ? (
              <Skeleton className="h-5 w-24 mt-2" />
            ) : (
              <div className ="flex gap-2 items-center">
                <p className="text-muted-foreground mt-1">
                  {items.length} {items.length === 1 ? "title" : "titles"}
                </p>
                <span className="text-muted-foreground mt-1 text-4xl">·</span>
                <p className="text-muted-foreground mt-1">
                  {new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className = "flex gap-2   mt-6">
          <button className="px-4 py-2 text-sm text-zinc-500 text-zinc-800 transition cursor-pointer items-center gap-1 flex bg-zinc-100 rounded-md">
            <Send className="w-4 h-4 text-blue-700" />
            Share
          </button>
          <Separator orientation="vertical" className="h-5" />
          <button className="px-4 py-2 text-sm text-zinc-500 text-zinc-800 transition cursor-pointer flex items-center gap-1 bg-zinc-100 rounded-md">
            <Link className="w-4 h-4 text-pink-700" />
            Invite Friends to Collaborate
          </button>
        </div>
      </div>
      <Separator className="mt-8 w-full" />
      <div
        className="flex flex-wrap gap-4 px-20 mt-8"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="flex flex-col rounded-xl overflow-hidden w-[250px]"
              >
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
                      onRemoveBookmark={handleRemoveItem}
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
