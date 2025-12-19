import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Rating } from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getFavourites, setFavouritesToStorage } from "../utils/favourites";

//
import type { Product } from "../types/product";

//
interface ProductCardProps {
  products: Product[];
}

export default function ProductCard({ products }: ProductCardProps) {
  const navigate = useNavigate();

  // Lazy initialization: will run only once when the component mounts
  const [favourites, setFavourites] = useState<number[]>(() => getFavourites());

  function openProductPage(productId: number) {
    navigate(`/products/${productId}`);
  }

  const toggleFavourite = (id: number) => {
    setFavourites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      setFavouritesToStorage(updated);
      return updated;
    });
  };

  if (products.length === 0)
    return (
      <div className="flex justify-center my-20">
        There are no products mathing this filter
      </div>
    );

  /**
   *
   */
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products?.map((itm) => (
        <div
          key={itm.id}
          className="bg-blue-50 p-6 flex flex-col gap-1 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="w-50 h-50">
            <div>
              <button
                onClick={() => {
                  toggleFavourite(itm.id);
                }}
                className="flex items-center justify-center cursor-pointer"
              >
                {favourites.includes(itm.id) ? (
                  <FaHeart size={22} className="text-red-500" />
                ) : (
                  <FaRegHeart
                    size={22}
                    className="text-gray-400 hover:text-red-400"
                  />
                )}
              </button>
            </div>
            <img
              loading="lazy"
              alt={itm.title}
              src={itm.images[0]}
              className="w-full h-full pb-4 object-contain"
            />
          </div>

          <p className="font-bold">{itm.title}</p>
          <Rating
            max={5}
            readOnly
            size="medium"
            precision={0.1}
            value={itm.rating ?? 0}
          />
          <div className="flex justify-between font-semibold">
            <p>${itm.price} </p>
            <p>-%{itm.discountPercentage}</p>
          </div>
          <p className="line-clamp-2 flex-1 text-gray-600 text-sm">
            {itm.description}
          </p>
          <Button
            size="large"
            variant="outlined"
            onClick={() => openProductPage(itm.id)}
          >
            Learn more
          </Button>
        </div>
      ))}
    </div>
  );
}
