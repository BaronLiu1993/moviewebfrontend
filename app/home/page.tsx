import MovieCard from "../appcomponents/home/movieCard";

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
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

  return (
    <div className="font-figtree flex flex-col gap-10 pb-6">
      <div className="p-6">
        <div className = "px-6 py-2">
          <h1 className="font-medium text-xl">New Favourites For Light Hearted Korean Dramas</h1>
        <div></div>
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
      
      
    </div>
  );
};

export default Home;
