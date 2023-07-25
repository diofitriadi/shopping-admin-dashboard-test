import Sidebar from "@/components/Sidebar";
import { useUsers } from "@/hooks/useUser";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function UserTable() {
  const {
    users,
    isLoading,
    error,
    page,
    setPage,
    nextPage,
    prevPage,
    numPages,
    cartItems,
  } = useUsers();

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center">
        Error loading users
      </div>
    );

  // Generate page numbers
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(numPages, startPage + 4);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-grow px-8 py-4 overflow-auto">
        <Typography fontWeight={700}>User Detail With Carts</Typography>
        <table className="h-[400px] w-full text-left mt-5">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Total Products</th>
              <th className="px-4 py-2">Total Cart</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                <td className="border px-4 py-2">{user.email}</td>
                {cartItems[user.id] ? (
                  <>
                    <td className="border px-4 py-2">
                      {cartItems[user.id].totalProducts} Products
                    </td>
                    <td className="border px-4 py-2">
                      {cartItems[user.id].totalQuantity} Unit
                    </td>
                  </>
                ) : (
                  <td className="border px-4 py-2">No data available</td>
                )}

                <td className="border px-4 py-2">
                  {cartItems[user.id] &&
                  cartItems[user.id].totalProducts === 0 &&
                  cartItems[user.id].totalQuantity === 0 ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      disabled
                    >
                      Details
                    </Button>
                  ) : (
                    <Link href={`/admin/user/${user.id}`}>
                      <Button variant="contained" size="small" color="primary">
                        Details
                      </Button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-4 space-x-2">
          <button
            className={`px-2 py-1 border border-blue-500 rounded ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={prevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          {pages.map((number) => (
            <button
              key={number}
              className={`px-2 py-1 border border-blue-500 rounded ${
                page === number ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setPage(number)}
              disabled={page === number}
            >
              {number}
            </button>
          ))}
          <button
            className={`px-2 py-1 border border-red-500 rounded ${
              page === numPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={nextPage}
            disabled={page === numPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
