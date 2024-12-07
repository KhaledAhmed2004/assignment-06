import React, { useRef, useState, useEffect } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

interface CategoryItem {
  _id: string;
  name: string;
}

const SearchFilter = () => {
  const { categories, isLoading, error } = useCategories();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || ""); // New state for sorting
  const [debouncedSearch] = useDebounce(search, 500);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const categoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "all");
    setSortOrder(searchParams.get("sort") || "");
  }, [searchParams]);

  useEffect(() => {
    if (!isFirstLoad) {
      handleSubmit();
    } else {
      setIsFirstLoad(false);
    }
  }, [debouncedSearch, category, sortOrder]);

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    if (sortOrder) {
      params.set("sort", sortOrder); // Add sort parameter to query
    }
    const queryString = params.toString();
    router.push(`?${queryString}`);
  };

  const scrollCategory = (direction: "left" | "right") => {
    if (categoryRef.current) {
      const scrollAmount = 200;
      categoryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory === "all" ? "all" : selectedCategory);
  };

  const handleSortChange = (sort: "upvotes" | "downvotes") => {
    setSortOrder((prevSortOrder) => {
      // Toggle between ascending and descending
      if (prevSortOrder === sort) return `-${sort}`;
      if (prevSortOrder === `-${sort}`) return sort;
      return sort;
    });
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl">
      {/* Search input */}
      <div className="mb-4 flex items-center relative">
        <FaSearch className="absolute left-4 text-gray-400 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-0.5 rounded-full shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-11 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Sorting options */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleSortChange("upvotes")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            sortOrder === "upvotes"
              ? "bg-blue-200 text-blue-500"
              : sortOrder === "-upvotes"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-600 dark:text-gray-300"
          }`}
        >
          Sort by Upvotes
        </button>
        <button
          onClick={() => handleSortChange("downvotes")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            sortOrder === "downvotes"
              ? "bg-blue-200 text-blue-500"
              : sortOrder === "-downvotes"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-600 dark:text-gray-300"
          }`}
        >
          Sort by Downvotes
        </button>
      </div>

      {/* Category scrollable list */}
      <div className="relative flex items-center justify-center">
        <button
          className="z-10 p-3 text-gray-500 hover:text-gray-800 focus:outline-none dark:text-gray-300 dark:hover:text-gray-200"
          onClick={() => scrollCategory("left")}
        >
          <FaChevronLeft size={24} />
        </button>

        <div
          ref={categoryRef}
          className="flex overflow-x-auto no-scrollbar space-x-3 py-3"
        >
          <button
            onClick={() => handleCategorySelect("all")}
            className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium border ${
              category === "all"
                ? "bg-blue-200 text-blue-500"
                : "bg-gray-200 dark:bg-gray-600 dark:text-gray-300"
            }`}
          >
            All
          </button>

          {categories?.map((categoryItem: CategoryItem) => (
            <button
              key={categoryItem._id}
              onClick={() => handleCategorySelect(categoryItem.name)}
              className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium border ${
                category === categoryItem.name
                  ? "bg-blue-200 text-blue-500"
                  : "bg-gray-200 dark:bg-gray-600 dark:text-gray-300"
              }`}
            >
              {categoryItem.name}
            </button>
          ))}
        </div>

        <button
          className="z-10 p-3 text-gray-500 hover:text-gray-800 focus:outline-none dark:text-gray-300 dark:hover:text-gray-200"
          onClick={() => scrollCategory("right")}
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
