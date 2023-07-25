import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { ProductsResponse, Product } from "./type";
import category from "@/pages/api/category";
import brand from "@/pages/api/brand";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useProducts = () => {
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  // Category
  const [selectedCategory, setSelectedCategory] = useState("");
  // Brand
  const [selectedBrand, setSelectedBrand] = useState("");
  // Pagination
  const limit = 10; // Items per page
  const [page, setPage] = useState(1);

  // Add state for price range
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  // Add state for all products
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  // Add state for paginated products
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

  // Build URL
  let url = `https://dummyjson.com/products`;

  if (searchQuery) {
    url += `/search?q=${searchQuery}`;
  }

  url += `${searchQuery ? "&" : "?"}limit=100`;

  const { data, error } = useSWR<ProductsResponse>(url, fetcher);

  useEffect(() => {
    if (data) {
      const filteredProducts = data.products.filter(
        (product: Product) =>
          product.price >= priceRange.min &&
          product.price <= priceRange.max &&
          (selectedCategory ? product.category === selectedCategory : true) &&
          (selectedBrand ? product.brand === selectedBrand : true) // Filter by brand
      );
      setAllProducts(filteredProducts);
    }
  }, [data, priceRange, selectedCategory, selectedBrand]);

  // When allProducts or page changes, calculate the new paginatedProducts
  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setPaginatedProducts(allProducts.slice(start, end));
  }, [allProducts, page]);

  const isLoading = !error && !data;

  const total: number = allProducts.length;
  const numPages = Math.ceil(total / limit);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, numPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return {
    isLoading,
    error,
    products: paginatedProducts,
    nextPage,
    prevPage,
    page,
    setPage,
    numPages,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    category,
    brand,
  };
};
