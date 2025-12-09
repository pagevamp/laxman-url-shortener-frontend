import { FilterType, SortableFields, SortOrder } from "@/app/types/types";
import Input from "./Input";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
interface SearchBarProps {
  handleFilterChange: (value: FilterType) => void;
  handleSearchChange: (value: string) => void;
  queryParams: {
    currentPage: number;
    search: string;
    filter: FilterType;
    sortBy: SortableFields;
    sortOrder: SortOrder;
  };
}

const SearchBar = ({
  handleSearchChange,
  handleFilterChange,
  queryParams,
}: SearchBarProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 bg-gray-50 dark:bg-gray-900 p-4">
      <Input
        id="searchQuery"
        type="text"
        name="search query"
        placeholder="Search by URL or short code..."
        value={queryParams.search}
        onChange={(e) => handleSearchChange(e.target.value)}
        inputClassName={
          "w-full md:w-2/3 px-3 py-2 rounded-xl border focus:outline-gray-500 border-gray-400 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        }
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </Input>
      <select
        value={queryParams.filter}
        onChange={(e) => handleFilterChange(e.target.value as FilterType)}
        className="px-5 py-2 rounded-xl border focus:outline-none border-gray-300 dark:border-gray-700 w-full md:w-1/4 lg:w-1/8 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer"
      >
        <option value={FilterType.ALL}>All URLs</option>
        <option value={FilterType.ACTIVE}>Active URLs</option>
        <option value={FilterType.EXPIRED}>Expired URLs</option>
      </select>
    </div>
  );
};

export default SearchBar;
