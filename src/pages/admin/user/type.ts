// Define interface for User
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: any;
}

// Define interface for Product
export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

// Define interface for Cart
export interface Cart {
  products: Product[];
  carts: {
    id: number;
    products: Product[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  }[];
  total: number;
  skip: number;
  limit: number;
  totalQuantity: number;
}