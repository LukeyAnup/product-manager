import Rating from "@mui/material/Rating";
import { useState } from "react";
import { IoIosSettings, IoMdClose } from "react-icons/io";
import { usePriceFilterStore } from "../store";

export default function ProductFilterComponent() {
  const {
    minPrice,
    maxPrice,
    rating,
    setMinPrice,
    setMaxPrice,
    setRating,
    resetPrices,
  } = usePriceFilterStore();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="hidden md:flex md:flex-col rounded-xl shadow-lg md:my-16 mx-2 px-3 py-8 bg-blue-50 space-y-6">
        <div
          onClick={resetPrices}
          className="flex justify-end underline cursor-pointer"
        >
          Reset
        </div>
        <div className="text-2xl">Product Filters</div>
        <div>
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex gap-2">
            <input
              min={0}
              type="number"
              placeholder="Min"
              value={minPrice ?? ""}
              className="w-1/2 border border-gray-600 rounded-md p-2"
              onChange={(e) => {
                const value = e.target.value;
                setMinPrice(value);
              }}
            />

            <input
              min={0}
              type="number"
              placeholder="Max"
              value={maxPrice ?? ""}
              className="w-1/2 border border-gray-600 rounded-md p-2"
              onChange={(e) => {
                const value = e.target.value;
                setMaxPrice(value);
              }}
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Rating</h3>
          <Rating
            value={rating ?? null}
            onChange={(_, newValue) => setRating(newValue ?? undefined)}
            precision={0.5}
          />
        </div>
      </div>

      <div className="flex justify-end mx-2 py-3 md:hidden">
        <div
          className="flex justify-end mx-2 px-3 cursor-pointer"
          onClick={toggleDrawer}
        >
          {!isOpen ? <IoIosSettings color="blue" size={25} /> : ""}
        </div>

        <div
          className={`fixed top-0 right-0 h-full w-74 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">Product filters</h2>
              <div onClick={toggleDrawer}>
                <IoMdClose />
              </div>
            </div>

            <div
              onClick={resetPrices}
              className="flex justify-end underline cursor-pointer pt-4"
            >
              Reset
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="flex gap-2">
                  <input
                    min={0}
                    type="number"
                    placeholder="Min"
                    value={minPrice ?? ""}
                    className="w-1/2 border rounded-md p-2"
                    onChange={(e) => {
                      const value = e.target.value;
                      setMinPrice(value);
                    }}
                  />

                  <input
                    min={0}
                    type="number"
                    placeholder="Max"
                    value={maxPrice ?? ""}
                    className="w-1/2 border rounded-md p-2"
                    onChange={(e) => {
                      const value = e.target.value;
                      setMaxPrice(value);
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <Rating
                  value={rating ?? null}
                  onChange={(_, newValue) => setRating(newValue ?? undefined)}
                  precision={0.5}
                />
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={toggleDrawer}
          />
        )}
      </div>
    </div>
  );
}
