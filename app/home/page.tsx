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
        Authorization: `Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImJkZThjY2VjLWU0NzItNDA2Ny1iYzljLTUxZjE4MTIxYzNhNCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb2Njc3dwcGtzcWVnaXBwamVpLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJmNThmMmZlOC05OGM0LTRlMjAtOWNjZi1kOTBmMWEzYmRkYmQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcyMjYxNzY3LCJpYXQiOjE3NzIyNTgxNjcsImVtYWlsIjoiYmFyb25saXUxOTkzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJiYXJvbmxpdTE5OTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkJhcm9uIExpdSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiZjU4ZjJmZTgtOThjNC00ZTIwLTljY2YtZDkwZjFhM2JkZGJkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NzIyNTgxNjd9XSwic2Vzc2lvbl9pZCI6IjU5NGY4YmUxLTM5M2EtNDU3Zi04OTAxLTA1MjEwYzJiNmUxMCIsImlzX2Fub255bW91cyI6ZmFsc2V9.Klxd0aYHxwlYJ5iMEKLHHA-U5Co6dd7KgpMvIOZZRAjwg0PVzFEgnrlUk47eQUEFbgUAYe2EFZDoiAMMB2adLQ`,
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
