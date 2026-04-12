import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FriendFeedClient from "../custom/trending/friendFeedClient";

const TrendingPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const headers = { Authorization: `Bearer ${token}` };
  const meRes = await fetch("http://localhost:8000/v1/api/auth/me", { headers });
  const me = await meRes.json();

  return <FriendFeedClient token={token} user={me.data} />;
};

export default TrendingPage;
