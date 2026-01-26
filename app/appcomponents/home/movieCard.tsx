"use client";

import { Badge } from "@/components/ui/badge";
import {
  Book,
  Bookmark,
  ChevronDown,
  Heart,
  Pencil,
  Star,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface MovieCardProps {
  imageUrl: string;
  title: string;
  tags: number[];
  overview: string;
}

const MovieCard = ({ imageUrl, title, tags, overview }: MovieCardProps) => {
  const [rating, setRating] = useState<string | null>(null);

  const getRatingBgColor = (ratingType: string) => {
    if (rating === ratingType) {
      switch (ratingType) {
        case "liked":
          return "bg-green-100";
        case "fine":
          return "bg-yellow-100";
        case "disliked":
          return "bg-red-100";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <>
      <div className="font-figtree w-48 hover:bg-neutral-100 rounded-xl">
        <div className="h-60 w-48 mb-2 shadow-sm relative bg-gray-200 rounded-2xl overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
            alt={title}
            fill
            className="object-cover"
          />

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <button className="absolute flex hover:shadow-lg gap-1 justify-center items-center cursor-pointer shadow-sm top-2 right-2 bg-white text-black px-2 py-1 rounded-md">
                  <Star className="w-4 h-4 stroke-1" />
                  <div className="text-xs">Rate</div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <div className="text-neutral-500 text-xs font-medium">
                    Watched{" "}
                    {(() => {
                      const d = new Date();
                      const day = d.getDate();
                      const suffix =
                        day > 3 && day < 21
                          ? "th"
                          : ["th", "st", "nd", "rd"][day % 10] || "th";
                      return `${d.toLocaleDateString("en-US", { month: "long" })} ${day}${suffix} ${d.getFullYear()}`;
                    })()}
                  </div>
                  <div className="p-1 flex gap-1 flex-wrap">
                    {tags.map((tag, idx) => (
                      <Badge key={idx}>{tag}</Badge>
                    ))}
                  </div>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 ">
                      <div className="flex gap-2 items-center">
                        <Star className="h-4 w-4" />
                        <h1 className="font-medium text-xs">Rating</h1>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <button
                          onClick={() => setRating("liked")}
                          className={`border-1 px-2 py-1 rounded-md cursor-pointer hover:bg-green-50 ${getRatingBgColor("liked")}`}
                        >
                          I liked it!
                        </button>
                        <button
                          onClick={() => setRating("fine")}
                          className={`border-1 px-2 py-1 rounded-md cursor-pointer hover:bg-yellow-50 ${getRatingBgColor("fine")}`}
                        >
                          It was fine!
                        </button>
                        <button
                          onClick={() => setRating("disliked")}
                          className={`border-1 px-2 py-1 rounded-md cursor-pointer hover:bg-red-50 ${getRatingBgColor("disliked")}`}
                        >
                          I didn't like it!
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <Tag className="h-4 w-4" />
                        <h1 className="font-medium text-xs">Tag Friends</h1>
                      </div>
                      <ChevronDown className="h-4 w-4 stroke-1" />
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <Heart className="h-4 w-4" />
                        <h1 className="font-medium text-xs">Tag Friends</h1>
                      </div>
                      <ChevronDown className="h-4 w-4 stroke-1" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <Pencil className="h-4 w-4" />
                        <h1 className="font-medium text-xs">Write Note</h1>
                      </div>
                      <Textarea />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <button>Cancel</button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        <div className="p-2">
          <div className = "flex gap-2 items-center">
            <h2 className="font-medium line-clamp-2">{title}</h2>
            <button>
              <Bookmark className="w-5 h-5 stroke-1 float-right mt-1 cursor-pointer" />
            </button>
          </div>
          <h3 className="text-xs text-neutral-600">
            {overview.slice(0, 40)}...
          </h3>
          <div className="p-1 flex gap-1 flex-wrap">
            {tags.map((tag, idx) => (
              <Badge key={idx}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
