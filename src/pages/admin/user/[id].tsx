import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import Sidebar from "@/components/Sidebar";
import { User, Product, Cart } from "./type";

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
    <div className="flex">
      <Sidebar />
      <TableContainer
        component={Paper}
        className="flex-grow"
        style={{ height: "100vh" }}
      >
        {/* Display user info here */}
        {user && (
          <>
            <Typography variant="h5" component="div" gutterBottom>
              User Name: {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              Email: {user.email}
            </Typography>
          </>
        )}

        <Typography variant="h4" component="div" gutterBottom>
          Cart Details
        </Typography>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Discounted Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.carts[0]?.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.total}</TableCell>
                <TableCell>{product.discountPercentage}%</TableCell>
                <TableCell>{product.discountedPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="h6" component="div" gutterBottom>
          Total Price: {cart?.carts[0]?.total}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Discounted Total: {cart?.carts[0]?.discountedTotal}
        </Typography>
      </TableContainer>
    </div>
  );
}

export default CartDetail;
