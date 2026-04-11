"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Star, X } from "lucide-react";
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmitRating = async () => {
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
          hasImage: !!imageFile,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to submit rating");
      }

      const { data } = await response.json();

      if (data?.uploadUrl && imageFile) {
        await fetch(data.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
      }

      setRating(0);
      setReview("");
      handleRemoveImage();
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
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
          {imagePreview ? (
            <div className="relative w-fit">
              <img src={imagePreview} alt="Preview" className="rounded-md max-h-40 object-cover" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-background border rounded-full p-0.5 cursor-pointer hover:bg-zinc-100"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition cursor-pointer"
            >
              <ImagePlus size={18} />
              Add photo
            </button>
          )}
        </div>
        <Button className="w-fit cursor-pointer" onClick={handleSubmitRating}>
          Submit Review
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
