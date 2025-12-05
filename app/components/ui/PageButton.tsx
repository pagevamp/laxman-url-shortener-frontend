interface PageButtonProps {
  page: number;
  isActive?: boolean;
  handlePageChange: (page: number) => void;
}

export const PageButton = ({
  page,
  isActive = false,
  handlePageChange,
}: PageButtonProps) => (
  <button
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
