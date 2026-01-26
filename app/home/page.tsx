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

interface FeedCardProps {
  id: number;
  movieTitle: string;
  sceneImage: string;
  userNote: string;
  initialLikes: number;
  initialComments: number;
  userName: string;
  userAvatar?: string;
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

  const [GenreData]: [GenreDataType] = await Promise.all([
    fetch(
      `http://localhost:8000/v1/api/query/keyword-search?genres=${genres}&countries=${countries}&fromYear=${fromYear}&toYear=${toYear}`,
      {
        cache: "no-store",
      },
    ).then((res) => res.json()),
  ]);

  console.log(GenreData);

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

  const mockFeedData: FeedCardProps[] = [
    {
      id: 1,
      movieTitle: "Crash Landing on You",
      sceneImage:
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
      userNote:
        "This scene absolutely destroyed me 😭 The chemistry here is unreal.",
      initialLikes: 128,
      initialComments: 24,
      userName: "Jisoo Kim",
      userAvatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: 2,
      movieTitle: "Reply 1988",
      sceneImage:
        "https://images.unsplash.com/photo-1502136969935-8d07106b9c63",
      userNote:
        "Felt like home. Every character in this show feels like family.",
      initialLikes: 302,
      initialComments: 57,
      userName: "Minho Park",
      userAvatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 3,
      movieTitle: "Business Proposal",
      sceneImage:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
      userNote: "Pure rom-com fun. No thoughts, just vibes 💕",
      initialLikes: 89,
      initialComments: 11,
      userName: "Soojin Lee",
      userAvatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: 4,
      movieTitle: "My Mister",
      sceneImage:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
      userNote: "Heavy but beautiful. One of those shows that stays with you.",
      initialLikes: 410,
      initialComments: 76,
      userName: "Daniel Cho",
      userAvatar: "https://i.pravatar.cc/150?img=8",
    },
  ];

  return (
    <div className="font-figtree flex flex-col gap-10 pb-6">
      <div>
        <div className="px-6 py-2">
          <h1 className="font-medium text-xl">
            New Favourites For Light Hearted Korean Dramas
          </h1>
        </div>
        <div className="flex px-6 overflow-x-scroll space-x-4">
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

      <div className = "space-y-6">
        {mockFeedData.map((item) => (
          <FeedCard key={item.id} {...item} />
        ))}
      </div>

      <div>
        <div className="px-6 py-2 flex flex-col gap-1">
          <h1 className="font-medium text-xl">Watch lists</h1>
          <button className="flex items-center font-medium text-sm gap-2">
            <Badge className="bg-neutral-300 text-black">
              <Plus className="w-4 h-4" />
              Create Watch list
            </Badge>
          </button>
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
