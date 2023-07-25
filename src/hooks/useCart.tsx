import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { Cart, CartItem } from "./type"; // Please define your Cart and CartItem types

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({} as Cart);

  const { data, error } = useSWR<Cart>("https://dummyjson.com/carts", fetcher);

  useEffect(() => {
    if (data) {
      setCart(data);
    }
  }, [data]);

  const isLoading = !error && !data;

  // Function to handle adding items to the cart
  const addToCart = (item: CartItem) => {
    // Implement add to cart logic
  };

  // Function to handle removing items from the cart
  const removeFromCart = (item: CartItem) => {
    // Implement remove from cart logic
  };

  // Function to handle updating the quantity of items in the cart
  const updateQuantity = (item: CartItem, quantity: number) => {
    // Implement update quantity logic
  };

  return {
    isLoading,
    error,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
};
