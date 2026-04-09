"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBookmarkStore } from "@/stores/bookmarkStore";

type ListItem = {
  list_id: string;
  name: string;
};

interface BookmarkButtonProps {
  tmdb_id: number;
  title: string;
  genre_ids: number[];
  poster_url: string;
  lists: ListItem[];
  token: string;
}

const BookmarkButton = ({
  tmdb_id,
  title,
  genre_ids,
  poster_url,
  lists,
  token,
}: BookmarkButtonProps) => {
  const { addBookmark, removeBookmark, getListId } = useBookmarkStore();
  const savedTo = getListId(tmdb_id);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = lists.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSaveToList = async (listId: string) => {
    addBookmark(tmdb_id, listId);
    setOpen(false);
    setSearch("");

    try {
      const response = await fetch(`/api/list/items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId: listId,
          tmdbId: tmdb_id,
          title: title,
          genre_ids: genre_ids,
          poster_url: poster_url,
        }),
      });

      if (!response.ok) {
        removeBookmark(tmdb_id);
      }
    } catch {
      removeBookmark(tmdb_id);
    }
  };

  const handleRemove = async () => {
    const prevListId = savedTo;
    removeBookmark(tmdb_id);
    try {
      const response = await fetch(`/api/list/items`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId: prevListId,
          tmdbId: tmdb_id,
        }),
      });

      if (!response.ok) {        
        if (prevListId) addBookmark(tmdb_id, prevListId);
      }
    } catch {
      if (prevListId) addBookmark(tmdb_id, prevListId);
    }
  };

  if (savedTo) {
    const listName = lists.find((l) => l.list_id === savedTo)?.name ?? "List";
    return (
      <Badge
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleRemove();
        }}
        className="cursor-pointer text-sm text-white bg-green-600 rounded-lg"
      >
        <Check size={14} />
        {listName}
      </Badge>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Badge className="cursor-pointer text-sm text-white bg-yellow-600 rounded-lg">
            <Bookmark size={14} />
            Bookmark
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="end">
          <Input
            placeholder="Search lists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 mb-2"
          />
          <div className="max-h-40 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">
                No lists found
              </p>
            ) : (
              filtered.map((list) => (
                <button
                  key={list.list_id}
                  onClick={() => handleSaveToList(list.list_id)}
                  className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent cursor-pointer"
                >
                  {list.name}
                </button>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BookmarkButton;
