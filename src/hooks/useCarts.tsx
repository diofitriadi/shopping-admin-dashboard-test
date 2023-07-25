import { useEffect, useState } from "react";
import { Cart, CartsResponse, User } from "./type";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useCarts = () => {
  const limit = 10; // Items per page
  const [page, setPage] = useState(1);

  // Add state for all carts
  const [allCarts, setAllCarts] = useState<Cart[]>([]);
  // Add state for paginated carts
  const [paginatedCarts, setPaginatedCarts] = useState<Cart[]>([]);
  // Add state for user names
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

  // Build URL
  let url = `https://dummyjson.com/carts?limit=100`;

  const { data, error } = useSWR<CartsResponse>(url, fetcher);

  useEffect(() => {
    if (data) {
      setAllCarts(data.carts);
      // Fetch user details for each cart
      Promise.all(
        data.carts.map((cart) =>
          axios
            .get(`https://dummyjson.com/carts/${cart.id}`)
            .then((res) => res.data)
        )
      ).then((users) => {
        const newNames: { [key: string]: string } = {};
        users.forEach((user: User, index) => {
          newNames[
            data.carts[index].userId
          ] = `${user.firstName} ${user.lastName}`;
        });
        setUserNames(newNames);
      });
    }
  }, [data]);

  // When allCarts or page changes, calculate the new paginatedCarts
  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setPaginatedCarts(allCarts.slice(start, end));
  }, [allCarts, page]);

  const isLoading = !error && !data;

  const total: number = allCarts.length;
  const numPages = Math.ceil(total / limit);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, numPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return {
    isLoading,
    error,
    carts: paginatedCarts,
    nextPage,
    prevPage,
    page,
    setPage,
    numPages,
    userNames, // Also return userNames
  };
};
