// ProductsPage.tsx
import React from "react";
import { useProducts } from "@/hooks/useProducts";
import Sidebar from "@/components/Sidebar";
import { FaSpinner } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

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
    resetFilters,
  } = useProducts();
  if (error) return <div>Failed to load</div>;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // handle search query change
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    setSelectedBrand(event.target.value);
  };

  const resetPriceRange = () => {
    setPriceRange({ min: 0, max: 5000 });
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
      <div className="flex flex-col w-full px-4 py-3">
        <div>
          <h5 className="font-bold mb-2 mt-5 md:mt-0">Product List</h5>
          <TextField
            label="Search products..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2, marginRight: 1 }}
            size="small"
          />
          <FormControl
            variant="outlined"
            sx={{ marginBottom: 2, marginRight: 1 }}
            size="small"
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
              className="w-[200px]"
            >
              <MenuItem value="">
                <em>All Category</em>
              </MenuItem>
              {category?.sort().map((categoryName) => (
                <MenuItem
                  key={categoryName}
                  value={categoryName}
                  className="capitalize"
                >
                  {categoryName}
                </MenuItem>
              ))}
              {/* add more options based on the categories you have */}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            sx={{ marginBottom: 2, marginRight: 1 }}
            size="small"
          >
            <InputLabel id="brand-label">Brand</InputLabel>
            <Select
              labelId="brand-label"
              value={selectedBrand}
              onChange={handleBrandChange}
              label="Brand"
              className="w-[200px]"
            >
              <MenuItem value="">
                <em>All Brand</em>
              </MenuItem>
              {brand?.map((brandName) => (
                <MenuItem key={brandName} value={brandName}>
                  {brandName}
                </MenuItem>
              ))}
              {/* add more options based on the categories you have */}
            </Select>
          </FormControl>
          <button
            onClick={resetFilters}
            className="px-3 py-2.5 border text-sm w-[150px] bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl mb-2"
          >
            Reset Filters
          </button>
        </div>
        <div>
          <div className="flex flex-col md:flex-row gap-5 md:gap-10">
            <Typography>Price Range : </Typography>
            <div className="flex justify-between">
              <div className="w-[10px]">${priceRange.min}</div>
              <Slider
                value={[priceRange.min, priceRange.max]}
                onChange={(e, newValue) => {
                  setPriceRange({
                    min: (newValue as number[])[0],
                    max: (newValue as number[])[1],
                  });
                }}
                // valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                min={0}
                max={2000}
                sx={{ width: "300px", marginLeft: 4, marginRight: 3 }}
              />
              <div className="mt-0.5">${priceRange.max}</div>
            </div>
          </div>
          <button
            onClick={resetPriceRange}
            className="mt-2 px-2 py-1 border text-sm w-[100px] bg-blue-500 hover:bg-blue-400 text-white font-bold rounded mb-2"
          >
            Reset Price
          </button>
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
            } w-full text-left rounded-lg overflow-hidden shadow-lg text-sm`}
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
                  <td className="border px-4 py-2">{product.stock}</td>
                  <td className="border px-4 py-2 capitalize">
                    {product.category}
                  </td>
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
};

export default ProductsPage;
