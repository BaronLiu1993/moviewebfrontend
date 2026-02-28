
"use client";


import React from "react";
import Masonry from "@mui/lab/Masonry";
import FeedCard from "./cards/feedCard";
import SearchBar from "./search/searchBar";


type FeedItem = {
  tmdb_id: number;
  title: string;
  genre_ids: number[];
  release_year: number;
  photo_url: string;
};

interface HomeClientProps {
  feed: FeedItem[];
}

const HomeClient: React.FC<HomeClientProps> = ({ feed }) => {
  return (
    <div>
    <SearchBar />
      <Masonry
        columns={3}
        spacing={4}
        defaultHeight={900}
        defaultSpacing={4}>
        {feed.map((item, idx) => (
          <div key={idx}>
            <FeedCard
              tmdb_id={item.tmdb_id}
              title={item.title}
              genre_ids={item.genre_ids}
              release_year={item.release_year}
              photo_url={item.photo_url}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default HomeClient;
