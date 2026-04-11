"use client";

import React, { useState } from "react";
import SearchBar from "./search/searchBar";
import FeedSection from "./feed/feedSection";
import WatchlistSection from "./watchlist/watchlistSection";
import AppSidebar from "../sidebar/appSidebar";
import { CreatePanelProvider, useCreatePanel } from "../sidebar/createPanelContext";
import { SidebarInset } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { List, Plus } from "lucide-react";

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
  user_id: string;
  name: string;
  is_default: boolean;
  created_at: string;
  image_url?: string;
};

type User = {
  user_id: string;
  email: string;
  name: string;
  genres: string[];
  movies: string[];
  moods: string[];
  disliked_genres: string[];
  completed_registration: boolean;
  rating_count: number;
};

interface HomeClientProps {
  feed: Feed;
  list: ListItem[];
  token: string;
  user: User;
}

function HomeInner({ feed, list, token, user }: HomeClientProps) {
  const { open } = useCreatePanel();
  const [activeTab, setActiveTab] = useState<string>("feed");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) setActiveTab("feed");
  };

  return (
    <>
    <AppSidebar />
    <SidebarInset
      className="transition-[margin] duration-500 ease-in-out font-figtree min-w-0 overflow-hidden"
      style={{ marginLeft: open ? "calc(20rem + var(--sidebar-width))" : "var(--sidebar-width)" }}
    >
      <SearchBar onSearch={handleSearch} />
      <div className="flex gap-4 w-full px-20 py-4">
        <button
          onClick={() => setActiveTab("feed")}
          className={`text-lg font-medium ${activeTab === "feed" ? "underline decoration-2 underline-offset-8" : "text-muted-foreground"}`}
        >
          Feed
        </button>
        {list.map((l) => (
          <button
            key={l.list_id}
            onClick={() => setActiveTab(l.list_id)}
            className={`text-lg font-medium ${activeTab === l.list_id ? "underline decoration-2 underline-offset-8" : "text-muted-foreground"}`}
          >
            {l.name}
          </button>
        ))}
      </div>
      {activeTab === "feed" ? (
        <FeedSection
          initialFeed={feed}
          token={token}
          lists={list}
          searchQuery={searchQuery}
        />
      ) : (
        <WatchlistSection
          name={list.find((l) => l.list_id === activeTab)?.name ?? ""}
          listId={activeTab}
          token={token}
          lists={list}
          createdAt={list.find((l) => l.list_id === activeTab)?.created_at ?? ""}
          imageUrl={list.find((l) => l.list_id === activeTab)?.image_url}
        />
      )}
    </SidebarInset>
    </>
  );
}

const HomeClient: React.FC<HomeClientProps> = (props) => {
  return (
    <CreatePanelProvider token={props.token}>
      <HomeInner {...props} />
    </CreatePanelProvider>
  );
};

export default HomeClient;
