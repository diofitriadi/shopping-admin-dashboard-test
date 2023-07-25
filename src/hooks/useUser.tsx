import { useEffect, useState } from "react";
import { User, UsersResponse } from "./type";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useUsers = () => {
  const limit = 10; // Items per page
  const [page, setPage] = useState(1);

  // Add state for all users
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // Add state for paginated users
  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);

  // Add state for total cart items and total quantity of each user
  const [cartItems, setCartItems] = useState<{
    [id: string]: { totalProducts: number; totalQuantity: number };
  }>({});

  // Build URL
  let url = `https://dummyjson.com/users?limit=100`;

  const { data, error } = useSWR<UsersResponse>(url, fetcher);

  useEffect(() => {
    if (data) {
      setAllUsers(data.users);
      Promise.all(
        data.users.map((user) =>
          axios
            .get(`https://dummyjson.com/carts/user/${user.id}`)
            .catch((err) => ({ data: { carts: [] } }))
        )
      ).then((cartResponses) => {
        const newCartItems: {
          [key: number]: { totalProducts: number; totalQuantity: number };
        } = {};
        cartResponses.forEach((res, index) => {
          if (res.data.carts && res.data.carts[0]) {
            newCartItems[data.users[index].id] = {
              totalProducts: res.data.carts[0].totalProducts,
              totalQuantity: res.data.carts[0].totalQuantity,
            };
          } else {
            newCartItems[data.users[index].id] = {
              totalProducts: 0,
              totalQuantity: 0,
            };
          }
        });
        setCartItems(newCartItems);
      });
    }
  }, [data]);

  // When allUsers or page changes, calculate the new paginatedUsers
  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setPaginatedUsers(allUsers.slice(start, end));
  }, [allUsers, page]);

  const isLoading = !error && !data;

  const total: number = allUsers.length;
  const numPages = Math.ceil(total / limit);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, numPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return {
    isLoading,
    error,
    users: paginatedUsers,
    nextPage,
    prevPage,
    page,
    setPage,
    numPages,
    cartItems,
  };
};
