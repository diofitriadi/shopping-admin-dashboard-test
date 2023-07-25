import Sidebar from "@/components/Sidebar";
import { useCarts } from "@/hooks/useCarts";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function CartTable() {
  const {
    carts,
    userNames,
    isLoading,
    error,
    page,
    setPage,
    nextPage,
    prevPage,
    numPages,
  } = useCarts();

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center">
        Error loading carts
      </div>
    );

  // Generate page numbers
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(numPages, startPage + 4);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  console.log(carts, "ini cart nya");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-grow px-8 py-4 overflow-auto">
        <Typography fontWeight={700}>Carts Detail</Typography>
        <table className="h-[400px] w-full text-left mt-5">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Cart No</th>
              <th className="px-4 py-2">No of Items</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <tr key={cart.id}>
                <td className="border px-4 py-2">Cart {cart.id}</td>
                {/* <td className="border px-4 py-2">{userNames[cart.userId]}</td> */}
                <td className="border px-4 py-2">
                  {cart.totalProducts} Products
                </td>
                <td className="border px-4 py-2">{cart.totalQuantity} Unit</td>

                <td className="border px-4 py-2">
                  {cart.totalProducts === 0 && cart.totalQuantity === 0 ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      disabled
                    >
                      Details
                    </Button>
                  ) : (
                    <Link href={`/admin/cart/${cart.id}`}>
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
