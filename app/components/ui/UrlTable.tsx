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

const urls: UrlItem[] = [
  // 1
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340001",
    original_url: "https://google.com/search/about",
    short_url: "g0sA12",
    expires_at: "2025-12-30T06:42:35.000Z", // active
    created_at: "2025-11-29T11:00:25.368Z",
  },
  // 2
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340002",
    original_url: "https://vercel.com/docs/functions/edge-functions",
    short_url: "edge2025",
    expires_at: "2025-11-30T10:00:00.000Z", // < 1 day left
    created_at: "2025-08-25T10:12:40.200Z",
  },
  // 3
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340003",
    original_url: "https://nextjs.org/docs",
    short_url: "nxA77",
    expires_at: "2025-11-28T14:00:00.000Z", // expired
    created_at: "2025-11-10T08:30:10.100Z",
  },
  // 4
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340004",
    original_url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    short_url: "mdnJS55",
    expires_at: "2025-12-03T21:00:00.000Z", // active
    created_at: "2025-10-10T09:12:40.100Z",
  },
  // 5
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340005",
    original_url: "https://expressjs.com/en/guide/routing.html",
    short_url: "expRt1",
    expires_at: "2025-11-29T22:00:00.000Z", // < 1 day left
    created_at: "2025-11-20T11:05:00.000Z",
  },
  // 6
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340006",
    original_url: "https://react.dev/reference/react",
    short_url: "rctRef6",
    expires_at: "2025-12-10T12:00:00.000Z", // active
    created_at: "2025-09-29T12:00:00.000Z",
  },
  // 7
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340007",
    original_url: "https://openai.com/research",
    short_url: "OAres77",
    expires_at: "2025-11-25T09:00:00.000Z", // expired
    created_at: "2025-11-01T17:00:00.000Z",
  },
  // 8
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340008",
    original_url: "https://bun.sh/docs/api",
    short_url: "bapi202",
    expires_at: "2025-12-15T11:00:00.000Z",
    created_at: "2025-11-15T13:45:00.000Z",
  },
  // 9
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340009",
    original_url: "https://cloudflare.com/learning/cdn/what-is-a-cdn",
    short_url: "cdn95x",
    expires_at: "2025-11-29T10:30:00.000Z", // < 1 day
    created_at: "2025-11-20T10:00:00.000Z",
  },
  // 10
  {
    id: "a1f2d3e4-1111-4444-9999-abcd12340010",
    original_url: "https://nodejs.org/api/fs.html",
    short_url: "fsApi88",
    expires_at: "2025-12-20T16:00:00.000Z",
    created_at: "2025-10-02T19:20:00.000Z",
  },
  // 11
  {
    id: "a1x2d3e4-1111-4444-9999-abcd12340011",
    original_url: "https://github.com/features/copilot",
    short_url: "gCP999",
    expires_at: "2025-11-26T07:40:00.000Z", // expired
    created_at: "2025-10-10T07:00:00.000Z",
  },
  // 12
  {
    id: "a1x2d3e4-1111-4444-9999-abcd12340012",
    original_url: "https://tailwindcss.com/docs",
    short_url: "tw444",
    expires_at: "2025-11-29T23:59:00.000Z", // < 1 day left
    created_at: "2025-11-14T08:30:00.000Z",
  },
  // 13
  {
    id: "b2c3d4e5-2222-4444-9999-abcd12340013",
    original_url: "https://stripe.com/docs",
    short_url: "strp77",
    expires_at: "2025-12-05T09:00:00.000Z", // active
    created_at: "2025-11-10T12:00:00.000Z",
  },
  // 14
  {
    id: "b2c3d4e5-2222-4444-9999-abcd12340014",
    original_url: "https://supabase.com/docs",
    short_url: "spb88",
    expires_at: "2025-11-20T18:00:00.000Z", // expired
    created_at: "2025-10-01T10:00:00.000Z",
  },
  // 15
  {
    id: "b2c3d4e5-2222-4444-9999-abcd12340015",
    original_url: "https://mongodb.com/docs/manual",
    short_url: "mdb990",
    expires_at: "2025-12-12T16:00:00.000Z", // active
    created_at: "2025-11-01T12:30:00.000Z",
  },
  // 16
  {
    id: "b2c3d4e5-2222-4444-9999-abcd12340016",
    original_url: "https://docker.com/get-started",
    short_url: "dckr55",
    expires_at: "2025-11-29T05:00:00.000Z", // < 1 day left
    created_at: "2025-11-25T09:00:00.000Z",
  },
  // 17
  {
    id: "b2c3d4e5-2222-4444-9999-abcd12340017",
    original_url: "https://python.org/dev/peps",
    short_url: "pPEP8",
    expires_at: "2025-12-25T10:10:00.000Z",
    created_at: "2025-09-20T10:20:00.000Z",
  },
  // 18
  {
    id: "b2c3d4e5-2222-4444-9999-abcd12340018",
    original_url: "https://nuxt.com/docs",
    short_url: "nxT300",
    expires_at: "2025-11-21T08:00:00.000Z", // expired
    created_at: "2025-11-11T12:00:00.000Z",
  },
  // 19
  {
    id: "c3d4e5f6-3333-4444-9999-abcd12340019",
    original_url: "https://postgresql.org/docs",
    short_url: "pgSQL7",
    expires_at: "2025-12-18T15:00:00.000Z",
    created_at: "2025-11-18T08:00:00.000Z",
  },
  // 20
  {
    id: "c3d4e5f6-3333-4444-9999-abcd12340020",
    original_url: "https://graphql.org/learn",
    short_url: "gQL10",
    expires_at: "2025-11-29T03:00:00.000Z", // < 1 day
    created_at: "2025-11-27T07:30:00.000Z",
  },
  // 21
  {
    id: "c3d4e5f6-3333-4444-9999-abcd12340021",
    original_url: "https://kubernetes.io/docs",
    short_url: "k8sDocs",
    expires_at: "2025-11-10T12:00:00.000Z", // expired
    created_at: "2025-09-13T06:10:00.000Z",
  },
  // 22
  {
    id: "c3d4e5f6-3333-4444-9999-abcd12340022",
    original_url: "https://developer.apple.com/documentation",
    short_url: "applDev",
    expires_at: "2025-12-08T18:00:00.000Z",
    created_at: "2025-10-30T14:20:00.000Z",
  },
  // 23
  {
    id: "d4e5f6g7-4444-4444-9999-abcd12340023",
    original_url: "https://dev.to",
    short_url: "devTO99",
    expires_at: "2025-11-29T18:30:00.000Z", // < 1 day left
    created_at: "2025-11-15T06:00:00.000Z",
  },
  // 24
  {
    id: "d4e5f6g7-4444-4444-9999-abcd12340024",
    original_url: "https://go.dev/doc",
    short_url: "goLang9",
    expires_at: "2025-11-26T11:00:00.000Z", // expired
    created_at: "2025-10-04T10:00:00.000Z",
  },
  // 25
  {
    id: "d4e5f6g7-4444-4444-9999-abcd12340025",
    original_url: "https://prisma.io/docs",
    short_url: "prs88",
    expires_at: "2025-12-17T17:00:00.000Z",
    created_at: "2025-11-03T10:00:00.000Z",
  },
  // 26
  {
    id: "d4e5f6g7-4444-4444-9999-abcd12340026",
    original_url: "https://nestjs.com",
    short_url: "njs44",
    expires_at: "2025-11-29T20:00:00.000Z", // < 1 day
    created_at: "2025-11-22T09:00:00.000Z",
  },
  // 27
  {
    id: "e5f6g7h8-5555-4444-9999-abcd12340027",
    original_url: "https://deno.com/manual",
    short_url: "deno77",
    expires_at: "2025-11-18T06:00:00.000Z", // expired
    created_at: "2025-11-01T17:00:00.000Z",
  },
  // 28
  {
    id: "e5f6g7h8-5555-4444-9999-abcd12340028",
    original_url: "https://fastapi.tiangolo.com",
    short_url: "fast661",
    expires_at: "2025-12-22T14:00:00.000Z",
    created_at: "2025-11-05T11:00:00.000Z",
  },
  // 29
  {
    id: "e5f6g7h8-5555-4444-9999-abcd12340029",
    original_url: "https://astro.build/docs",
    short_url: "astro99",
    expires_at: "2025-11-29T04:00:00.000Z", // < 1 day
    created_at: "2025-11-28T02:40:00.000Z",
  },
  // 30
  {
    id: "e5f6g7h8-5555-4444-9999-abcd12340030",
    original_url: "https://svelte.dev/docs",
    short_url: "svt55",
    expires_at: "2025-12-11T13:00:00.000Z", // active
    created_at: "2025-10-20T14:00:00.000Z",
  },
];

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
  } = useUrl();
  const itemsPerPage = 10;

  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_URL;

  const filteredData = useFilteredSortedUrls(urls);
  const startIndex = (queryParams.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 min-h-[800px]">
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

            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition hover:scale-100"
                >
                  <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>

                  <td className="p-2">
                    <a
                      href={item.original_url}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium max-w-[200px] truncate overflow-hidden whitespace-nowrap block"
                      title={item.original_url}
                    >
                      {item.original_url}
                    </a>
                  </td>

                  <td className="p-2">
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
        </div>

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
