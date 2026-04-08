"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatingDialogProps {
  title: string;
  tmdb_id: number;
  genre_ids: number[];
  release_year: number;
  token: string;
  children: React.ReactNode;
}

const RatingDialog = ({ title, tmdb_id, genre_ids, release_year, children, token }: RatingDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const displayRating = hoveredStar || rating;
  const [review, setReview] = useState("");
  const handleSubmitRating = async () => {
    // Handle rating submission logic here
    try {
      const response = await fetch("/api/rate/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          tmdbId: tmdb_id,
          rating: rating,
          note: review,
          name: title,
          genre_ids: genre_ids,
        }),
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to submit rating");
      }

      console.log("Rating submitted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-left gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="group relative cursor-pointer rounded-full p-1 transition-transform duration-200 hover:scale-125 focus-visible:outline-none"
              style={{
                transform: hoveredStar === star ? "scale(1.05)" : undefined,
                transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onClick={() => setRating(star === rating ? 0 : star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
            >
              <Star
                size={32}
                className="transition-all duration-200"
                fill={star <= displayRating ? "#facc15" : "transparent"}
                color={star <= displayRating ? "#facc15" : "#a1a1aa"}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {rating > 0
            ? `You rated this ${rating} out of 5`
            : "Tap a star to rate"}
        </p>
        <Textarea
          className="min-h-[150px]"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Button className = "w-fit cursor-pointer" onClick={handleSubmitRating}>
          Submit Review
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
