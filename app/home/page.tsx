import { Badge } from "@/components/ui/badge";
import MovieCard from "../appcomponents/home/movieCard";
import WatchCard from "../appcomponents/home/watchCard";

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
}

interface PlaylistItem {
  id: number;
  name: string;
  description: string;
}

interface GenreDataType {
  data: {
    results: TMDBMovie[];
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
  const { genres = "18, 10749", countries = "KR", fromYear = "20202", toYear = "2022" } = searchParamsData;

  const [GenreData]: [GenreDataType] = await Promise.all([
    fetch(`http://localhost:8000/v1/api/query/keyword-search?genres=${genres}&countries=${countries}&fromYear=${fromYear}&toYear=${toYear}`, {
      cache: "no-store",
    }).then((res) => res.json()),
  ]);

  console.log(GenreData)

  const mockPlaylists: PlaylistItem[] = [
    {
      id: 1,
      name: "Weekend Binge Watch",
      description: "Perfect dramas for a cozy weekend",
    },
    {
      id: 2,
      name: "Feel-Good Romances",
      description: "Light-hearted love stories to brighten your day",
    },
    {
      id: 3,
      name: "Emotional Roller Coasters",
      description: "Intense dramas with plot twists",
    },
    {
      id: 4,
      name: "Hidden Gems",
      description: "Underrated Korean dramas worth watching",
    },
  ];

  return (
    <div className="font-figtree flex flex-col gap-10 pb-6">
      <div>
        <div className = "px-6 py-2">
          <h1 className="font-medium text-xl">New Favourites For Light Hearted Korean Dramas</h1>
        </div>
        <div className="flex px-6 overflow-x-scroll space-x-4">
          {GenreData.data.results.map((movie, idx) => (
            <div>
              <MovieCard
                key={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                tags={movie.genre_ids}
                overview={movie.overview}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="px-6 py-2">
          <h1 className="font-medium text-xl">Watch lists</h1>
        </div>
        <div className="flex px-6 overflow-x-scroll space-x-4">
          {mockPlaylists.map((playlist) => (
            <div key={playlist.id}>
              <WatchCard playlist={playlist} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
