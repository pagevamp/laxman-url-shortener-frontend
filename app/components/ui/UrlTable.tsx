"use client";

import { UrlItem, SortableFields } from "../../types/types";
import { useUrl } from "@/app/hooks/useUrlTable";
import Pagination from "./Pagination";
import {
  PencilIcon,
  ClipboardDocumentCheckIcon,
  ChevronUpDownIcon,
  TrashIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "./SearchField";
import { useEffect } from "react";
import { getUrls } from "@/app/api/url.api";

export default function UrlTable() {
  const {
    queryParams,
    copiedMap,
    getExpiryBg,
    handleCopyClick,
    useFilteredSortedUrls,
    handleSearchChange,
    handlePageChange,
    handleFilterChange,
    handleSort,
    formatDate,
    urls,
    setUrls,
    loading,
    setLoading,
  } = useUrl();
  const itemsPerPage = 10;

  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_URL;

  const filteredData = useFilteredSortedUrls(urls);
  const startIndex = (queryParams.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2NiNjY5Yy03NDk3LTQ2MWMtODhhOC01NDQ5YzViY2E1ZjkiLCJ1c2VybmFtZSI6ImxheG1hbiIsImlhdCI6MTc2NDg0MzIyMSwiZXhwIjoxNzY1NDQ4MDIxfQ.iXTU1RS15EPe6bFCjNwV3V35jU2boG_DMhcuBoLrY9g";
  useEffect(() => {
    if (!token) return;
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const data = await getUrls(token);
        console.log("the data is: ", data);
        setUrls(data.data.urls);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [token]);

  return (
    <div className="overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-900 shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6">
      <div className="mb-5 pb-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        {/* search bar with add new url button */}
        <SearchBar
          handleFilterChange={handleFilterChange}
          handleSearchChange={handleSearchChange}
          queryParams={queryParams}
        />

        {/* table */}
        <table className="w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium">
                #
              </th>
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium">
                Original URL
              </th>
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium">
                Short URL
              </th>
              <th
                onClick={() => {
                  handleSort(SortableFields.EXPIRES_AT);
                }}
                className="p-4 text-gray-700 dark:text-gray-300 font-medium cursor-pointer select-none hover:underline"
              >
                <div className="flex gap-3 items-center">
                  Expires At
                  <ChevronUpDownIcon className="h-5 w-5" />
                  {queryParams.sortBy === "expires_at" && (
                    <>
                      {queryParams.sortOrder === "asc" && (
                        <ArrowTrendingUpIcon className="h-5 w-5" />
                      )}
                      {queryParams.sortOrder === "desc" && (
                        <ArrowTrendingDownIcon className="h-5 w-5" />
                      )}
                    </>
                  )}
                </div>
              </th>

              <th
                onClick={() => {
                  handleSort(SortableFields.CREATED_AT);
                }}
                className="p-4 flex text-gray-700 dark:text-gray-300 font-medium cursor-pointer select-none hover:underline"
              >
                <div className="flex gap-3 items-center">
                  Created At
                  <ChevronUpDownIcon className="h-5 w-5" />
                  {queryParams.sortBy === "created_at" && (
                    <>
                      {queryParams.sortOrder === "asc" && (
                        <ArrowTrendingUpIcon className="h-5 w-5" />
                      )}
                      {queryParams.sortOrder === "desc" && (
                        <ArrowTrendingDownIcon className="h-5 w-5" />
                      )}
                    </>
                  )}
                </div>
              </th>
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium ">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="h-screen">
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition hover:scale-100"
              >
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  {index + 1}
                </td>

                <td className="p-4">
                  <a
                    href={item.original_url}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium max-w-[350px] truncate overflow-hidden whitespace-nowrap block"
                    title={item.original_url}
                  >
                    {item.original_url}
                  </a>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2 max-w-[250px]">
                    <span
                      className="flex-1 px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium rounded-full truncate"
                      title={BASE_DOMAIN + `/urls/` + item.short_url}
                    >
                      {BASE_DOMAIN + `/urls/` + item.short_url}
                    </span>

                    <button
                      onClick={() =>
                        handleCopyClick(
                          BASE_DOMAIN + `/urls/` + item.short_url,
                          item.id
                        )
                      }
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center text-black dark:text-white cursor-pointer hover:scale-105"
                      title="Copy URL"
                    >
                      {copiedMap[item.id] ? (
                        <span className="text-green-600 dark:text-green-400 text-xs font-semibold">
                          Copied!
                        </span>
                      ) : (
                        <ClipboardDocumentCheckIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>

                <td>
                  <span
                    className={`whitespace-nowrap p-2 rounded-4xl shadow-lg ${getExpiryBg(
                      item.expires_at
                    )}`}
                  >
                    {formatDate(item.expires_at)}
                  </span>
                </td>

                <td className="p-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {formatDate(item.created_at)}
                </td>

                <td className="p-4 flex items-center gap-2">
                  <button
                    className="
                        p-2.5 
                        rounded-full 
                        bg-blue-100 text-blue-700 
                        dark:bg-blue-500/30 dark:text-blue-300
                        hover:bg-blue-200 hover:scale-105 dark:hover:bg-blue-300/50
                        transition-all duration-200
                        shadow-sm hover:shadow-md cursor-pointer"
                    title="Edit"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>

                  <button
                    className="
                        p-2.5 
                        rounded-full 
                        bg-red-100 text-red-700 
                        dark:bg-red-900/30 dark:text-red-300
                        hover:bg-red-200 hover:scale-105 dark:hover:bg-red-800/50
                        transition-all duration-200
                        shadow-sm hover:shadow-md cursor-pointer"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* pagination */}

        <Pagination
          handlePageChange={handlePageChange}
          queryParams={queryParams}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
