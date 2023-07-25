import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMediaQuery, Drawer, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:768px)"); // will be true if screen width is less than 768px
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token"); // remove the token
    router.push("/login"); // redirect user to login page
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const DrawerContent = () => (
    <Box className="w-40 h-screen p-8 bg-blue-500 text-white flex flex-col justify-between">
      <h2 className="text-xl mb-6">Dashboard</h2>
      <div className="flex flex-col gap-6 text-lg">
        <Link href="/admin/products">
          <div
            className={`p-1 rounded ${
              router.pathname === "/admin/products"
                ? "bg-blue-900 text-white"
                : ""
            }`}
          >
            Products
          </div>
        </Link>
        <Link href="/admin/cart">
          <div
            className={`p-1 rounded ${
              router.pathname === "/admin/cart" ? "bg-blue-900 text-white" : ""
            }`}
          >
            Cart
          </div>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 w-full py-1 text-center text-white rounded bg-red-500 hover:bg-red-600"
      >
        Logout
      </button>
    </Box>
  );

  return (
    <div
      className={` ${
        isMobile
          ? "absolute left-[-4%] top-[-3%] flex justify-center items-center rounded-full bg-blue-600 h-14 w-14"
          : ""
      }`}
    >
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ pl: 4, pt: 2.5, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerToggle}
          >
            <DrawerContent />
          </Drawer>
        </>
      ) : (
        <DrawerContent />
      )}
    </div>
  );
};

export default Sidebar;
