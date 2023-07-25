import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Box, Button } from "@mui/material";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token"); // remove the token
    router.push("/login"); // redirect user to login page
  };

  return (
    <Box className="w-64 h-screen p-8 bg-gray-800 text-white flex flex-col justify-between">
      <h2 className="text-xl mb-6">Dashboard</h2>
      <div className="flex flex-col gap-6 text-lg">
        <Link href="/admin/products">
          <Button variant="text" color="primary">
            Products
          </Button>
        </Link>
        <Link href="/admin/cart">
          <Button variant="text" color="primary">
            Cart
          </Button>
        </Link>
      </div>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="error"
        className="mt-4 w-full py-2 text-center text-white rounded bg-red-500 hover:bg-red-600"
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
