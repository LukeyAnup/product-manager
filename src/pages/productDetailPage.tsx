import { useEffect, useState } from "react";
import { fetchProductById } from "../api/products";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/product";

//
import Loader from "../components/loader";
import ProductImages from "../components/productImages";
import { BiLeftArrow } from "react-icons/bi";
import ButtonComponent from "../components/reusable/button";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  function goToProductsPage() {
    navigate("/products");
  }

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError("Failed to load product. Please try again.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 text-xl mb-6">
            {error || "Product not found"}
          </p>
          <ButtonComponent
            onClick={() => goToProductsPage()}
            size="large"
            text="Back to Products"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center hover:text-blue-600 md:mx-20 mx-3 mb-8">
        <BiLeftArrow className="h-5 w-5" />
        <ButtonComponent
          onClick={() => goToProductsPage()}
          variant="text"
          text="Back to Products"
        />
      </div>

      <div className="md:flex gap-8">
        <div>
          <ProductImages images={product?.images} />
        </div>
        <div className="px-3 md:px-0">
          <div className="flex flex-col gap-4 pt-10">
            <div className="text-2xl font-bold">{product?.title}</div>
            <div className="flex gap-20 font-semibold">
              <p>${product?.price} </p>
              <p>-%{product?.discountPercentage}</p>
            </div>
            <p className="text-lg">
              <span className="font-bold">Description: </span>
              {product?.description}
            </p>
            <span>
              <span className="font-bold">Minimum order quantity: </span>
              {product?.minimumOrderQuantity}
            </span>
            <p>
              <span className="font-bold">Return policy: </span>
              {product?.returnPolicy}
            </p>
            <p>
              <span className="font-bold">Availability status: </span>
              {product?.availabilityStatus}
            </p>
            <p>
              <span className="font-bold">Shipping information: </span>
              {product?.shippingInformation}
            </p>
            <p>{product?.warrentyInformation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
