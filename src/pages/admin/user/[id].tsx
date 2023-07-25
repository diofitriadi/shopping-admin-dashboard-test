import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import { User, Product, Cart } from "./type";
import { Typography } from "@mui/material";

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
        .get(`https://dummyjson.com/users/${id}/carts`)
        .then((response) => {
          setCart(response.data);
          setIsLoading(false);
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
        {/* Display user info here */}
        {user && (
          <div className="mb-4">
            <Typography variant="h5" gutterBottom>
              User Name: {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {user.email}
            </Typography>
          </div>
        )}

        <Typography variant="h4" gutterBottom>
          Cart Details
        </Typography>
        <div className="w-full text-left rounded-lg overflow-hidden shadow-lg">
          <table className="w-full text-left  ">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart?.carts[0]?.products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 border">{product.title}</td>
                  <td className="px-4 py-2 border">${product.price}</td>
                  <td className="px-4 py-2 border">{product.quantity}</td>
                  <td className="px-4 py-2 border">${product.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Typography variant="h6" component="div" gutterBottom>
          Total Price: ${cart?.carts[0]?.total}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Total Quantity: {cart?.carts[0]?.totalQuantity} units
        </Typography>
      </div>
    </div>
  );
}

export default CartDetail;
