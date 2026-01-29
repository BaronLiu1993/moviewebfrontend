import { Badge } from "@/components/ui/badge";
import MovieCard from "../appcomponents/home/cards/movieCard";
import WatchCard from "../appcomponents/home/cards/watchCard";
import FeedCard from "../appcomponents/home/cards/feedCard";
import { Plus } from "lucide-react";

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
}

interface TMDBMovieAiring {
  id: number;
  name: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
  popularity: number;
}

interface TMDBMoviePopular {
  id: number;
  name: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
  popularity: number;
}

interface GenreDataType {
  data: {
    results: TMDBMovie[];
  };
}

interface AiringDataType {
  data: {
    results: TMDBMovieAiring[];
  };
}

interface PopularDataType {
  data: {
    results: TMDBMoviePopular[];
  };
}

const Home = async (props: {
  searchParams: Promise<{
    genres?: string;
    countries?: string;
    fromYear?: string;
    toYear?: string;
  }>;
}) => {
  const searchParamsData = await props.searchParams;
  const {
    genres = "18, 10749",
    countries = "KR",
    fromYear = "20202",
    toYear = "2022",
  } = searchParamsData;

  const [GenreData, AiringData, PopularData]: [GenreDataType, AiringDataType, PopularDataType] = await Promise.all([
    fetch(
      `http://localhost:8000/v1/api/query/keyword-search?genres=${genres}&countries=${countries}&fromYear=${fromYear}&toYear=${toYear}`,
      {
        cache: "no-store",
      },
    ).then((res) => res.json()),
    fetch(
      `http://localhost:8000/v1/api/query/korean/airing`,
      {
        cache: "no-store",
      },
    ).then((res) => res.json()),
    fetch(
      `http://localhost:8000/v1/api/query/korean/popular`,
      {
        cache: "no-store",
      },
    ).then((res) => res.json()),
  ]);

  const sortedAiringData = [...AiringData.data.results].sort(
    (a, b) => b.popularity - a.popularity
  );

  const sortedPopularData = [...PopularData.data.results].sort(
    (a, b) => b.popularity - a.popularity
  );



  return (
    <div className="font-figtree flex flex-col pb-12 bg-white">
      <div className="px-8 py-8 space-y-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-bold text-2xl">
              New Favourites For Light Hearted Korean Dramas
            </h1>
          </div>
          <div className="flex overflow-x-scroll space-x-4">
            {GenreData.data.results.map((movie, idx) => (
                <MovieCard
                  key={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  tags={movie.genre_ids}
                  overview={movie.overview}
                />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-bold text-2xl">
              Trending Korean Dramas Airing
            </h1>
          </div>
          <div className="flex overflow-x-scroll space-x-4">
            {sortedAiringData.map((movie, idx) => (
                <MovieCard
                  key={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.name}
                  tags={movie.genre_ids}
                  overview={movie.overview}
                />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-bold text-2xl">
              Most Popular Korean Movies Right Now
            </h1>
          </div>
          <div className="flex overflow-x-scroll space-x-4">
            {sortedPopularData.map((movie, idx) => (
                <MovieCard
                  key={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.name}
                  tags={movie.genre_ids}
                  overview={movie.overview}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
