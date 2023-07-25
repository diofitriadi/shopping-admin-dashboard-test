import Sidebar from "@/components/Sidebar";
import { useUsers } from "@/hooks/useUser";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Link from "next/link";

export default function UserTable() {
  const {
    users,
    isLoading,
    error,
    page,
    nextPage,
    prevPage,
    numPages,
    cartItems,
  } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <>
      <div className="flex">
        <Sidebar />
        <TableContainer
          component={Paper}
          className="flex-grow "
          style={{ height: "100vh" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Total Products</TableCell>
                <TableCell>Total Cart</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  {cartItems[user.id] ? (
                    <>
                      <TableCell>
                        {cartItems[user.id].totalProducts} Products
                      </TableCell>
                      <TableCell>
                        {cartItems[user.id].totalQuantity} Unit
                      </TableCell>
                    </>
                  ) : (
                    <TableCell>No data available</TableCell>
                  )}

                  <TableCell>
                    <Link href={`/admin/user/${user.id}`}>
                      <Button variant="contained">Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex mt-4 space-x-2">
            <Button
              variant="outlined"
              color="primary"
              onClick={prevPage}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={nextPage}
              disabled={page === numPages}
            >
              Next
            </Button>
          </div>
        </TableContainer>
      </div>
    </>
  );
}
