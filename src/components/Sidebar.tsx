import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token"); // remove the token
    router.push("/login"); // redirect user to login page
  };

  return (
    <div className="w-64 h-[100vh] p-4 bg-gray-800 text-white flex flex-col justify-between px-5">
      <h2 className="text-xl mb-4">Admin Dashboard</h2>
      <div className="flex flex-col gap-5">
        <Link href="/admin/products">
          <button className="text-lg block">Products</button>
        </Link>
        <Link href="/admin/cart">
          <button className="text-lg block">Cart</button>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 w-full p-2 bg-red-500 text-white text-center rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
