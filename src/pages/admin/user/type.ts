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
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

// Define interface for Cart
export interface Cart {
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
}