"use client";

import { useState } from "react";

const MovieInput = () => {
  const genres = [
    "Romance",
    "Drama",
    "Comedy",
    "Action",
    "Thriller",
    "Mystery",
    "Fantasy",
    "Historical",
    "Sports",
    "School/Youth",
    "Supernatural",
    "Slice of Life",
    "Adventure",
    "Crime",
    "Friends to Lovers",
    "Enemies to Lovers",
    "Second Chance Romance",
    "Fake Relationship",
    "Rich/Poor Romance",
    "Time Travel",
    "Reincarnation",
    "Love Triangle",
    "Secret Identity",
    "Amnesia",
    "Unrequited Love",
    "Slow Burn",
    "Forbidden Love",
    "Parallel Universe",
  ];

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleGenre = (genre: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(genre)) {
      newSelected.delete(genre);
    } else {
      newSelected.add(genre);
    }
    setSelected(newSelected);
  };

  return (
    <>
      <div className = "p-8 font-figtree">
        <h1 className = "font-semibold text-2xl">What Are You Interested In?</h1>
        <h2>This will help us customise</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <div key={genre} className="relative cursor-pointer" onClick={() => toggleGenre(genre)}>
              <div className={`h-32 w-32 rounded-lg transition-all border-2 border-black overflow-hidden flex items-center justify-center`}>
                <div className={`h-full w-full rounded-md transition-all ${selected.has(genre) ? "bg-gray-400 scale-95" : "bg-gray-800 hover:scale-95"}`}></div>
              </div>
              <label htmlFor={genre} className="absolute font-semibold bottom-2 text-white left-2">{genre}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieInput;
