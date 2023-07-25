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
    // Cek apakah cookie untuk user sudah ada
    const user = Cookies.get("user");
    if (user) {
      // Jika user sudah login, redirect ke halaman admin
      router.push("/admin");
    }
  }, [router]);
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div>Welcome, Please Login First </div>
      <Link href="/login">
        <Button variant="outlined">Login</Button>
      </Link>
    </main>
  );
}
