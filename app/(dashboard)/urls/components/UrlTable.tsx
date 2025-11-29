"use client";

import { Button } from "@/app/components/ui/Button";
import { useUrl } from "@/app/hooks/useUrl";
import { PencilIcon, ClipboardDocumentCheckIcon, PlusIcon } from "@heroicons/react/24/outline";

interface UrlItem {
  id: string;
  original_url: string;
  short_url: string;
  expires_at: string;
  created_at: string;
}

const urls: UrlItem[] = [
  {
    id: "4b9dc947-c780-4111-bef3-d6dc3aba35ce",
    original_url: "https://google.github.io/eng-practices/review/reviewer",
    short_url: "xa62zZh",
    expires_at: "2025-12-30T06:42:35.000Z",
    created_at: "2025-11-29T14:58:25.368Z",
  },
  {
    id: "1ab2cd34-5678-99ef-1111-2222333344441",
    original_url: "https://vercel.com/docs/functions/edge-functions",
    short_url: "edgeFn10",
    expires_at: "2025-11-30T10:00:00.000Z",
    created_at: "2025-11-25T10:12:40.200Z",
  },
  {
    id: "9988aa77-bb66-cc55-d1d44-ff332211515",
    original_url: "https://nextjs.org/docs/app/building-your-application",
    short_url: "nextDocs",
    expires_at: "2025-11-29T14:00:00.000Z",
    created_at: "2025-11-10T08:30:10.100Z",
  }, {
    id: "9988aa77-bb66-cc55-dd144-ff331221155",
    original_url: "https://nextjs.org/docs/app/building-your-application",
    short_url: "nextDocs",
    expires_at: "2025-11-29T14:00:00.000Z",
    created_at: "2025-11-10T08:30:10.100Z",
  }, {
    id: "9988aa77-bb66-cc55-dd44-ff311113221155",
    original_url: "https://nextjs.org/docs/app/building-your-application",
    short_url: "nextDocs",
    expires_at: "2025-11-29T14:00:00.000Z",
    created_at: "2025-11-10T08:30:10.100Z",
  }, {
    id: "9988aa77-bb66-cc55-dd44-ff13113221155",
    original_url: "https://nextjs.org/docs/app/building-your-application",
    short_url: "nextDocs",
    expires_at: "2025-11-29T14:00:00.000Z",
    created_at: "2025-11-10T08:30:10.100Z",
  }, {
    id: "9988aa77-bb66-cc55-dd44-ff3322111515",
    original_url: "https://nextjs.org/docs/app/building-your-application",
    short_url: "nextDocs",
    expires_at: "2025-11-29T14:00:00.000Z",
    created_at: "2025-11-10T08:30:10.100Z",
  }, {
    id: "9988aa77-bb66-cc55-dd44-ff313221155",
    original_url: "https://nextjs.org/docs/app/building-your-application",
    short_url: "nextDocs",
    expires_at: "2025-11-29T14:00:00.000Z",
    created_at: "2025-11-10T08:30:10.100Z",
  },
];

export default function UrlTable() {
  const { copiedMap, handleCopyClick, getExpiryColor } = useUrl()

  const baseDomain = process.env.BASE_URL;

  return (
    <div className="w-full overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-900 shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Shortened URLs</h1>
        <Button
          className="flex items-center gap-2! px-4! bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition hover:scale-105"
        >
          <PlusIcon className="h-5 w-5" />
          Add New URL
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium">#</th>
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium">Original URL</th>
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium">Short URL</th>
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium">Expires At</th>
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium">Created At</th>
              <th className="p-4 text-gray-700 dark:text-gray-300 font-medium ">Actions</th>
            </tr>
          </thead>

          <tbody>
            {urls.map((item, index) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition hover:scale-100"
              >
                
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{index + 1}</td>

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
                      title={baseDomain + `/urls/` + item.short_url}
                    >
                      {baseDomain + `/urls/` + item.short_url}
                    </span>

                    <button
                      onClick={() => handleCopyClick(baseDomain + `/urls/` + item.short_url, item.id)}
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center text-black dark:text-white cursor-pointer hover:scale-105"
                      title="Copy URL"
                    >
                      {copiedMap[item.id] ? (
                        <span className="text-green-600 dark:text-green-400 text-xs font-semibold">Copied!</span>
                      ) : (
                        <ClipboardDocumentCheckIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>


                <td className={`p-4 font-medium ${getExpiryColor(item.expires_at)}`}>
                  {new Date(item.expires_at).toLocaleString()}
                </td>

                <td className="p-4 text-gray-700 dark:text-gray-300">
                  {new Date(item.created_at).toLocaleString()}
                </td>

                <td className="p-4">
                  <Button className="h-8! flex items-center gap-2 px-4! rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition cursor-pointer hover:scale-105">
                    <PencilIcon className="h-4 w-4" />
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
