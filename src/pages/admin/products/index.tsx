// ProductsPage.tsx
import React from "react";
import { useProducts } from "@/hooks/useProducts";
import Sidebar from "@/components/Sidebar";
import { FaSpinner } from "react-icons/fa";

const ProductsPage = () => {
  const {
    isLoading,
    error,
    products,
    nextPage,
    prevPage,
    page,
    numPages,
    setPage,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    category,
    selectedCategory,
    setSelectedCategory,
    brand,
    selectedBrand,
    setSelectedBrand,
  } = useProducts();
  if (error) return <div>Failed to load</div>;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // handle search query change
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value); // handle category change
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value); // handle brand change
  };

  console.log(selectedCategory, "ini kategori");

  const handlePriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    setPriceRange((prev) => ({ ...prev, [type]: e.target.value })); // handle price range change
  };

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
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full px-4 py-5">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="px-2 py-1 border mb-5 mr-2"
          />
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => handlePriceRangeChange(e, "min")}
            placeholder="Minimum price..."
            className="px-2 py-1 border mb-5 mr-2"
          />
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => handlePriceRangeChange(e, "max")}
            placeholder="Maximum price..."
            className="px-2 py-1 border mb-5 mr-2"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border px-2 py-1 "
          >
            <option value="">All Category</option>
            {category?.map((categoryName) => (
              <option className="" key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}

            {/* add more options based on the categories you have */}
          </select>
          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="border px-2 py-1 "
          >
            <option value="">All Brand</option>
            {brand?.map((brandName) => (
              <option className="" key={brandName} value={brandName}>
                {brandName}
              </option>
            ))}

            {/* add more options based on the categories you have */}
          </select>
        </div>

        <div className="relative w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="animate-spin text-blue-500 text-2xl" />
            </div>
          )}

          <table
            className={`${
              isLoading ? " h-[450px]" : ""
            } w-full text-left rounded-lg overflow-hidden shadow-lg`}
          >
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.title}</td>
                  <td className="border px-4 py-2">{product.brand}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">{product.stock} units</td>
                  <td className="border px-4 py-2">{product.category}</td>
                </tr>
              ))}
              {!isLoading && products.length === 0 && !error && (
                <tr>
                  <td
                    className="border px-4 py-2 text-center h-[400px]"
                    colSpan={5}
                  >
                    No data available
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td
                    className="border px-4 py-2 text-center text-red-500"
                    colSpan={5}
                  >
                    Failed to load data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex mt-4">
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
};

export default ProductsPage;
