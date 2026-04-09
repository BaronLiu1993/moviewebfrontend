
"use client";

import React, { useState } from "react";
import SearchBar from "./search/searchBar";
import FeedSection from "./feed/feedSection";
import WatchlistSection from "./watchlist/watchlistSection";

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
}

type ListItem = {
  list_id: string;
  user_id: string;
  name: string;
  is_default: boolean;
  created_at: string;
};



interface HomeClientProps {
  feed: Feed;
  list: ListItem[];
  token: string;
}

const HomeClient: React.FC<HomeClientProps> = ({ feed, list, token }) => {
  const [activeTab, setActiveTab] = useState<string>("feed");

  return (
    <div className="font-figtree">
      <div className="sticky top-0 z-10 bg-background">
        <SearchBar />
      </div>
      <div className="flex gap-4 w-full px-20 py-4">
        <button
          onClick={() => setActiveTab("feed")}
          className={`text-lg font-medium ${activeTab === "feed" ? "underline underline-offset-4" : "text-muted-foreground"}`}
        >
          Feed
        </button>
        {list.map((l) => (
          <button
            key={l.list_id}
            onClick={() => setActiveTab(l.list_id)}
            className={`text-lg font-medium ${activeTab === l.list_id ? "underline underline-offset-4" : "text-muted-foreground"}`}
          >
            {l.name}
          </button>
        ))}
      </div>
      {activeTab === "feed" ? (
        <FeedSection initialFeed={feed} token={token} lists={list} />
      ) : (
        <WatchlistSection
          name={list.find((l) => l.list_id === activeTab)?.name ?? ""}
          listId={activeTab}
          token={token}
          lists={list}
        />
      )}
    </div>
  );
};

export default HomeClient;
