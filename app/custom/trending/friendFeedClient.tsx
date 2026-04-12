"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Heart, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRatingLikeStore } from "@/stores/ratingLikeStore";

type FriendRating = {
  rating_id: string;
  user_id: string;
  user_name: string;
  tmdb_id: number;
  rating: number;
  note: string;
  film_name: string;
  genre_ids: number[];
  like_count: number;
  has_liked: boolean;
  created_at: string;
  image_url?: string;
};

type User = {
  user_id: string;
  email: string;
  name: string;
};

interface FriendFeedClientProps {
  token: string;
  user: User;
}

const FriendFeedClient = ({ token, user }: FriendFeedClientProps) => {
  const [ratings, setRatings] = useState<FriendRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/friend/feed?page=${pageRef.current}&pageSize=20`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      console.log(data);

      if (!data.ratings || data.ratings.length === 0) {
        setHasMore(false);
      } else {
        setRatings((prev) => [...prev, ...data.ratings]);
        pageRef.current += 1;
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error("Failed to load friend feed:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

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
    return () => clearInterval(interval);
  }, [loadMore, hasMore]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const { setLiked, toggleLike, isLiked, getCount } = useRatingLikeStore();
  useEffect(() => {
    ratings.forEach((r) => {
      if (getCount(r.rating_id) === 0 && !isLiked(r.rating_id)) {
        setLiked(r.rating_id, r.has_liked, r.like_count);
      }
    });
  }, [ratings, setLiked, getCount, isLiked]);

  const handleLikePost = async (ratingId: string) => {
    const wasLiked = isLiked(ratingId);
    toggleLike(ratingId);

    try {
      const res = await fetch("/api/rate/like-rating", {
        method: wasLiked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ratingId }),
      });

      if (!res.ok) {
        toggleLike(ratingId);
      }
    } catch {
      toggleLike(ratingId);
    }
  };

  const [friendSearch, setFriendSearch] = useState("");

  return (
    <div className="font-figtree flex gap-8 max-w-5xl mx-auto py-8 px-4">
      <div className="flex-1 max-w-2xl">
      <div className="flex flex-col gap-4">
        {ratings.map((r) => (
          <div key={r.rating_id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-300 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{r.user_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(r.created_at)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < r.rating ? "#facc15" : "transparent"}
                    color={i < r.rating ? "#facc15" : "#a1a1aa"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>
            {r.image_url && (
              <img
                src={r.image_url}
                alt={r.film_name}
                className="rounded-md aspect-square object-cover w-full"
              />
            )}
            <div className = "flex flex-col gap-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button
                  onClick={() => handleLikePost(r.rating_id)}
                  className="flex items-center gap-1 hover:text-foreground transition cursor-pointer"
                >
                  <Heart
                    size={24}
                    className="transition-all duration-200"
                    fill={isLiked(r.rating_id) ? "#ef4444" : "transparent"}
                    color={isLiked(r.rating_id) ? "#ef4444" : "currentColor"}
                    strokeWidth={1.5}
                  />
                  {getCount(r.rating_id)}
                </button>
              </div>
              <div>
                <p className="text-xl font-semibold">{r.film_name}</p>
                <p className="text-sm">{r.note}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-center text-muted-foreground py-4">Loading...</p>
        )}
        {!loading && ratings.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No friend activity yet. Invite some friends to get started!
          </p>
        )}
      </div>
      {hasMore && <div ref={sentinelRef} style={{ height: "40px" }} />}
      </div>

      {/* Right sidebar */}
      <div className="hidden lg:flex flex-col gap-6 w-72 flex-shrink-0 sticky top-8 self-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zinc-300 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
        <Input
          placeholder="Search friends..."
          value={friendSearch}
          onChange={(e) => setFriendSearch(e.target.value)}
          className="h-9"
        />
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-3">Suggested for you</p>
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-200 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">User {i}</p>
                    <p className="text-xs text-muted-foreground">Followed by friends</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-blue-500 hover:text-blue-700 cursor-pointer">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendFeedClient;
