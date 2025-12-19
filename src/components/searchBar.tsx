import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePriceFilterStore } from "../store";

export default function SearchBar() {
  const { query, setQuery } = usePriceFilterStore();

  return (
    <div className="w-full mx-auto relative px-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-200 transition-all"
      />
      <button className="absolute left-9 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500">
        <FaMagnifyingGlass className="h-5 w-5" />
      </button>
    </div>
  );
}
