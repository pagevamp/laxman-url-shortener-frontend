"use client";

export default function UrlTableSkeleton() {
  const rows = Array.from({ length: 10 });

  return (
    <div className="overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-900 shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6 animate-pulse">
      <div className="mb-5 pb-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        {/* search bar skeleton */}
        <div className="flex gap-3 mb-4">
          <div className="h-10 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-10 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>

        {/* table skeleton */}
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {Array.from({ length: 5 }).map((_, idx) => (
                <th
                  key={idx}
                  className="p-4 h-6 bg-gray-300 dark:bg-gray-600 rounded-md"
                ></th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((_, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                {Array.from({ length: 6 }).map((__, idx) => (
                  <td key={idx} className="p-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination skeleton */}
        <div className="flex justify-end gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
