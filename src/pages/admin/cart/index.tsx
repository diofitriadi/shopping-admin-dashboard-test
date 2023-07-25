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

  const handlePageClick = (pageNum: number) => {
    if (pageNum < 1 || pageNum > numPages) return;
    setPage(pageNum);
  };

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
      <div className="flex-grow px-8 py-4 overflow-auto h-[600px]">
        <h5 className="font-bold mt-0 md:mt-0">Carts Detail</h5>
        <table className=" w-full text-left text-sm mt-5">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Cart No</th>
              <th className="px-4 py-2">Number of Items</th>
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
                    <button
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded opacity-50 cursor-not-allowed"
                      disabled
                    >
                      detail
                    </button>
                  ) : (
                    <Link href={`/admin/cart/${cart.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        detail
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-blue-500 text-white mr-2"
          >
            Previous
          </button>
          {pages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === page
                  ? "bg-blue-700 text-white"
                  : "bg-blue-200 text-blue-700"
              } mr-2`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={page === numPages}
            className="px-3 py-1 rounded bg-blue-500 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
