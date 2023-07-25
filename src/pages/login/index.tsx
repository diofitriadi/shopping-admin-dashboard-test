import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await axios.post(`https://dummyjson.com/auth/login`, {
        username: username,
        password: password,
      });

      // Save the JWT to a cookie
      Cookies.set("token", res.data.token, { expires: 1 }); // 1 day

      console.log(res, "login successfully");
      toast.success("Login successful!"); // success toast
      router.push("/admin");
    } catch (err) {
      console.log(err);
      toast.error("Login failed!"); // error toast
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[80%] md:w-1/3 p-4 bg-white shadow-md rounded-md"
      >
        <h2 className="mb-4 text-xl text-center font-semibold">Login</h2>
        <label className="mb-2">Username:</label>
        <input
          type="text"
          className="mb-4 p-2 border rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="mb-2">Password:</label>
        <input
          type="password"
          className="mb-4 p-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
        >
          Submit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
