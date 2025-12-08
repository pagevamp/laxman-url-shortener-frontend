"use client";
import Modal from "@/app/components/ui/Modal";
import CreateUrlForm from "@/app/components/ui/CreateUrlForm";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/app/components/Button";
import UrlTableSkeleton from "@/app/components/UrlTableSkeleton";
import { PlusIcon } from "@heroicons/react/24/outline";
import UrlTable from "@/app/components/ui/UrlTable";
import EditUrlForm from "@/app/components/ui/EditUrlForm";
import { Suspense } from "react";
import { getUrls } from "@/app/api/url.api";
import { UrlItem } from "@/app/api/interfaces/interfaces";
import DeleteUrlForm from "@/app/components/ui/DeleteUrlForm";

export default function UrlPage() {
  const [isModalOpen, setIsModalOpen] = useState<
    "create" | "edit" | "delete" | null
  >(null);

  const [urls, setUrls] = useState<UrlItem[]>([]);

  const [selectedUrl, setSelectedUrl] = useState<UrlItem | null>(null);

  useEffect(() => {
    if (!!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  const fetchUrls = useCallback(async () => {
    const data = await getUrls();
    setUrls(data.data.urls);
  }, []);

  function handleClose(value: string) {
    setIsModalOpen(null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mx-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Shortened URLs
        </h1>
        <Button
          className="flex items-center gap-2 p-3! bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition hover:scale-105"
          onClick={() => setIsModalOpen("create")}
        >
          <PlusIcon className="h-5 w-5" />
          Add New URL
        </Button>
      </div>
      <Suspense fallback={<UrlTableSkeleton />}>
        <UrlTable
          fetchUrls={fetchUrls}
          urls={urls}
          setIsModalOpen={setIsModalOpen}
          setSelectedUrl={setSelectedUrl}
        />
      </Suspense>

      {isModalOpen === "create" && (
        <Modal onClose={() => handleClose("create")} title="Create New URL">
          <CreateUrlForm handleClose={handleClose} fetchUrls={fetchUrls} />
        </Modal>
      )}
      {isModalOpen === "edit" && (
        <Modal onClose={() => handleClose("edit")} title="Edit URL">
          <EditUrlForm url={selectedUrl} />
        </Modal>
      )}
      {isModalOpen === "delete" && (
        <Modal onClose={() => handleClose("delete")} title="Delete URL">
          <DeleteUrlForm url={selectedUrl} handleClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}
