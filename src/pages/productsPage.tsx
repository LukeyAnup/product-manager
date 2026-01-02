import { useEffect, useState } from "react";
import { usePriceFilterStore } from "../store";
import { fetchProducts } from "../api/products";
import type { Product } from "../types/product";

import Loader from "../components/loader";
import SearchBar from "../components/searchBar";
import ProductCard from "../components/productCard";
import ProductFilterComponent from "../components/productFilterComponent";
import Pagination from "../components/pagination";
import ButtonComponent from "../components/reusable/button";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const { query, minPrice, maxPrice, rating, page, limit, setPage } =
    usePriceFilterStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again .");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchQueryResult = product.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const minPriceResult =
      minPrice !== "" ? Number(product.price) >= Number(minPrice) : true;

    const maxPriceResult =
      maxPrice !== "" ? Number(product.price) <= Number(maxPrice) : true;

    const ratingResult =
      rating !== undefined ? Number(product.rating) >= rating : true;

    return (
      searchQueryResult && minPriceResult && maxPriceResult && ratingResult
    );
  });

  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit
  );
  const totalPages = Math.ceil(filteredProducts.length / limit);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="flex my-4">
            <p className="text-red-600 text-lg mb-4">{error}</p>
          </div>
          <ButtonComponent
            onClick={() => window.location.reload()}
            text="Retry"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-none md:w-1/5">
        <ProductFilterComponent />
      </div>

      <div className="md:flex-1">
        <SearchBar />
        <ProductCard products={paginatedProducts} />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      </div>
    </div>
  );
}
