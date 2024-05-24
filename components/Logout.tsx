"use client";

import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
      className="bg-jaffa-600 px-4 py-2 rounded-full text-white hover:bg-jaffa-800 transition-all duration-700"
    >
      Logout
    </button>
  );
}
