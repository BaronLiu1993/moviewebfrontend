import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InviteClient from "./inviteClient";

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect(`/login?redirect=/invite/${code}`);
  }

  return <InviteClient code={code} token={token} />;
}
