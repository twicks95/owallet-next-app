import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    router.push("/login");
  };
  return (
    <div>
      <Link href="/">Home</Link> | <Link href="/profile">Profile</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
