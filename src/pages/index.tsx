import { Button } from "@mui/material";
import { Inter } from "next/font/google";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      router.push("/admin");
    }
  }, [router]);
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 text-center text-white justify-center bg-gray-500 ${inter.className}`}
    >
      <div className="mb-5">
        Welcome To Admin Dashboard, Please Login To Continue{" "}
      </div>
      <Link href="/login">
        <button className="px-4 py-2 bg-blue-500 rounded-lg shadow-md text-white w-[100px]">
          Login
        </button>
      </Link>
    </main>
  );
}
