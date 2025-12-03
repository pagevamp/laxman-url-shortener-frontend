import { FilterType, SortableFields, SortOrder } from "@/app/types/types";

interface PaginationProps {
  handlePageChange: (page: number) => void;
  queryParams: {
    currentPage: number;
    search: string;
    filter: FilterType;
    sortBy: SortableFields;
    sortOrder: SortOrder;
  };
  totalPages: number;
}

const Pagination = ({
  handlePageChange,
  queryParams,
  totalPages,
}: PaginationProps) => {
  const { currentPage } = queryParams;

  const PageButton = (page: number, isActive = false) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`
        px-3 py-1.5 rounded-full text-sm font-medium transition cursor-pointer
        ${
          isActive
            ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
        }
      `}
    >
      {page}
    </button>
  );

  const pagesToRender = [];

  if (currentPage > 2) pagesToRender.push(PageButton(1));

  if (currentPage > 3)
    pagesToRender.push(<span key="start-ellipsis">...</span>);

  if (currentPage > 1) pagesToRender.push(PageButton(currentPage - 1));

  pagesToRender.push(PageButton(currentPage, true));

  if (currentPage < totalPages) pagesToRender.push(PageButton(currentPage + 1));

  if (currentPage < totalPages - 2)
    pagesToRender.push(<span key="end-ellipsis">...</span>);

  if (currentPage < totalPages - 1) pagesToRender.push(PageButton(totalPages));

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
        {/* Prev */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 rounded-full text-sm bg-gray-200 dark:bg-gray-700 
                     text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 
                     transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Prev
        </button>

        {pagesToRender}

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 rounded-full text-sm bg-gray-200 dark:bg-gray-700 
                     text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 
                     transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
