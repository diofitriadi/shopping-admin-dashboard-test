import React, { useEffect } from "react";
import Cookies from "js-cookie";
import withAuth from "../authenticator";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/products"); // Redirect to /admin/products
  }, [router]);

  return null; // Return null or a loading spinner while redirecting
};

export default withAuth(AdminPage);
