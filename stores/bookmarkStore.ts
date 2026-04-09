import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkEntry {
  tmdb_id: number;
  list_id: string;
}

interface BookmarkState {
  bookmarks: BookmarkEntry[];
  addBookmark: (tmdb_id: number, list_id: string) => void;
  removeBookmark: (tmdb_id: number) => void;
  getListId: (tmdb_id: number) => string | null;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (tmdb_id, list_id) =>
        set((state) => ({
          bookmarks: [
            ...state.bookmarks.filter((b) => b.tmdb_id !== tmdb_id),
            { tmdb_id, list_id },
          ],
        })),
      removeBookmark: (tmdb_id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.tmdb_id !== tmdb_id),
        })),
      getListId: (tmdb_id) => {
        const entry = get().bookmarks.find((b) => b.tmdb_id === tmdb_id);
        return entry?.list_id ?? null;
      },
    }),
    {
      name: "bookmark-storage",
    }
  )
);
