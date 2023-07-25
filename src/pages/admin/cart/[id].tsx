import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import { User, Product, Cart } from "../../../hooks/user/type";
import { Typography, Card, CardContent } from "@mui/material";
import { ProductInCart } from "@/hooks/type";

function CartDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/users/${id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          setError(err.message);
        });

      axios
        .get(`https://dummyjson.com/carts/${id}`)
        .then((response) => {
          // Keep the original response data for total and quantity
          const originalCartData = response.data;

          // fetch all the products details
          const productPromises = originalCartData.products.map(
            (product: ProductInCart) =>
              axios.get(`https://dummyjson.com/products/${product.id}`)
          );

          // use Promise.all to wait for all requests to complete
          Promise.all(productPromises)
            .then((productResponses) => {
              const detailedProducts = productResponses.map(
                (response) => response.data
              );
              // use this data to populate product details in the cart
              // assuming the response data has brand and category fields
              const updatedCart = {
                ...originalCartData,
                products: detailedProducts.map((product, index) => ({
                  ...product,
                  // Append the original quantity and total back to each product
                  quantity: originalCartData.products[index].quantity,
                  total: originalCartData.products[index].total,
                })),
              };
              setCart(updatedCart);
              setIsLoading(false);
            })
            .catch((err) => {
              setError(err.message);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-grow px-8 py-4 overflow-auto">
        <Card className="mb-8 w-full h-[150px]">
          <CardContent>
            <Typography variant="h6">User Details</Typography>
            <div className="flex gap-20 mt-5">
              {user && (
                <div className="mb-4">
                  <Typography gutterBottom>
                    User: {user.firstName} {user.lastName}
                  </Typography>
                  <Typography gutterBottom>Email: {user.email}</Typography>
                </div>
              )}
              <div>
                <Typography component="div" gutterBottom>
                  Total Amount: ${cart?.total}
                </Typography>
                <Typography component="div" gutterBottom>
                  Number of Items: {cart?.totalQuantity} units
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom>
          Cart Details
        </Typography>
        <div className="w-full text-left rounded-lg overflow-hidden shadow-lg mt-4">
          <table className="w-full text-left">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart?.products?.map((product: ProductInCart) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 border">{product.title}</td>
                  <td className="px-4 py-2 border">{product.brand}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border">${product.price}</td>
                  <td className="px-4 py-2 border">{product.quantity}</td>
                  <td className="px-4 py-2 border">${product.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartDetail;
