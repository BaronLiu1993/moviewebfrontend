"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import FeedCard from "../cards/feedCard";
import RatingDialog from "../rating/ratingDialog";
import { Skeleton } from "@/components/ui/skeleton";

type FeedItem = {
  tmdb_id: number;
  title: string;
  genre_ids: number[];
  release_year: number;
  photo_url: string;
};

type Feed = {
  films: FeedItem[];
  hasMore: boolean;
  page: number;
  pageSize: number;
};

type ListItem = {
  list_id: string;
  name: string;
};

interface FeedSectionProps {
  initialFeed: Feed;
  token: string;
  lists: ListItem[];
}

const FeedSection: React.FC<FeedSectionProps> = ({ initialFeed, token, lists }) => {
  const [items, setItems] = useState<FeedItem[]>(initialFeed.films);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialFeed.hasMore);
  const loadingRef = useRef(false);
  const pageRef = useRef(2);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/feed?page=${pageRef.current}&pageSize=40`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.films || data.films.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...data.films]);
        pageRef.current += 1;
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error("Failed to load more items:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasMore) return;

    const check = () => {
      if (!sentinelRef.current || loadingRef.current) return;
      const rect = sentinelRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 400) {
        loadMore();
      }
    };

    const interval = setInterval(check, 300);
    check();
    return () => clearInterval(interval);
  }, [loadMore, hasMore]);

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mx-auto" style={{ maxWidth: "fit-content" }}>
        {items.map((item) => (
          <div key={item.tmdb_id} className="animate-fade-in">
            <RatingDialog title={item.title} tmdb_id={item.tmdb_id} genre_ids={item.genre_ids} release_year={item.release_year} token={token}>
              <div>
                <FeedCard
                  tmdb_id={item.tmdb_id}
                  title={item.title}
                  genre_ids={item.genre_ids}
                  release_year={item.release_year}
                  photo_url={item.photo_url}
                  token={token}
                  lists={lists}
                />
              </div>
            </RatingDialog>
          </div>
        ))}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
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
        }
      </div>
      {hasMore && <div ref={sentinelRef} style={{ height: "40px" }} />}
    </>
  );
};

export default FeedSection;
