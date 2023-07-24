// hooks/useProducts.ts
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { ProductsResponse, Product } from "./type";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useProducts = () => {
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  // Category list
  const [categories, setCategories] = useState<string[]>([]);
  // Pagination
  const limit = 10; // Items per page
  const [page, setPage] = useState(1);
  const skip = (page - 1) * limit;

  // Fetch categories on mount
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        const sortedCategories = res.data.sort((a: string, b: any) =>
          a.localeCompare(b)
        );
        setCategories(sortedCategories);
      })
      .catch((error) => console.log(error)); // handle error here
  }, []);

  // Build URL
  // This one still wrong
  const url = `https://dummyjson.com/products${
    category ? "/category/" + category : ""
  }?limit=${limit}&skip=${skip}${
    searchQuery ? "&search?q=" + searchQuery : ""
  }`;

  const { data, error } = useSWR<ProductsResponse>(url, fetcher);

  const isLoading = !error && !data;
  const products: Product[] = data ? data.products : [];
  const total: number = data ? data.total : 0;
  const numPages = Math.ceil(total / limit);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, numPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return {
    isLoading,
    error,
    products,
    nextPage,
    prevPage,
    page,
    setPage,
    numPages,
    searchQuery,
    setSearchQuery,
    category,
    categories, // Provide categories list
    setCategory, // Allow setting current category
  };
};
