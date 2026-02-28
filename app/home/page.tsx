import { cookies } from "next/headers";
import HomeClient from "../appcomponents/home/homeClient";

const Home = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(
    "http://localhost:8000/v1/api/query/initial-feed",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    },
  );
  const feed = await response.json();
  const initialFeed = feed.data;
  const filteredFeed = initialFeed.filter(
    (item: any) => item.photo_url && item.photo_url.length > 0,
  );

  return (
    <div>
      <HomeClient feed={filteredFeed} />
    </div>
  );
};

export default Home;
