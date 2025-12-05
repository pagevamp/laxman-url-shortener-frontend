import { FilterType, SortableFields, SortOrder } from "@/app/types/types";
import { PageButton } from "./PageButton";

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

  const pagesToRender = [];

  if (currentPage > 2)
    pagesToRender.push(
      <PageButton key={1} page={1} handlePageChange={handlePageChange} />
    );

  if (currentPage > 3)
    pagesToRender.push(<span key="start-ellipsis">...</span>);

  if (currentPage > 1)
    pagesToRender.push(
      <PageButton
        key={currentPage - 1}
        page={currentPage - 1}
        handlePageChange={handlePageChange}
      />
    );

  pagesToRender.push(
    <PageButton
      key={currentPage}
      page={currentPage}
      isActive
      handlePageChange={handlePageChange}
    />
  );

  if (currentPage < totalPages)
    pagesToRender.push(
      <PageButton
        key={currentPage + 1}
        page={currentPage + 1}
        handlePageChange={handlePageChange}
      />
    );

  if (currentPage < totalPages - 2)
    pagesToRender.push(<span key="end-ellipsis">...</span>);

  if (currentPage < totalPages - 1)
    pagesToRender.push(
      <PageButton
        key={totalPages}
        page={totalPages}
        handlePageChange={handlePageChange}
      />
    );

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
