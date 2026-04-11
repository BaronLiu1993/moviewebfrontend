"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface InviteClientProps {
  code: string;
  token: string;
}

export default function InviteClient({ code, token }: InviteClientProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/friend/redeem-invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || "Failed to redeem invite");
        } else {
          setStatus("success");
          setMessage(`You're now friends with ${data.data?.inviterName || "them"}!`);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [code, token]);

  return (
    <div className="flex items-center justify-center min-h-screen font-figtree">
      <div className="text-center space-y-4">
        {status === "loading" && (
          <p className="text-lg text-muted-foreground">Accepting invite...</p>
        )}
        {status === "success" && (
          <>
            <p className="text-2xl font-bold">{message}</p>
            <button
              onClick={() => router.push("/home")}
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
            >
              Go to Home
            </button>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-lg text-red-500">{message}</p>
            <button
              onClick={() => router.push("/home")}
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
            >
              Go to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
