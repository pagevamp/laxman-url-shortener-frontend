"use client";
import Modal from "@/app/components/ui/Modal";
import CreateUrlForm from "../../components/ui/CreateUrlForm";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";
import UrlTableSkeleton from "@/app/components/UrlTableSkeleton";
import { PlusIcon } from "@heroicons/react/24/outline";
import UrlTable from "../../components/ui/UrlTable";
import EditUrlForm from "@/app/components/ui/EditUrlForm";
import { UrlItem } from "@/app/types/types";
import { Suspense } from "react";
import DeleteUrlForm from "@/app/components/ui/DeleteUrlForm";

export default function UrlPage() {
  const [isModalOpen, setIsModalOpen] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const [selectedUrl, setSelectedUrl] = useState<UrlItem | null>(null);

  useEffect(() => {
    if (isModalOpen.create || isModalOpen.edit || isModalOpen.delete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  function handleClose(value: string) {
    setIsModalOpen((prev) => ({ ...prev, [value]: false }));
  }

  return (
    <div>
      <div className="flex justify-between items-center mx-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Shortened URLs
        </h1>
        <Button
          className="flex items-center gap-2 p-3! bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition hover:scale-105"
          onClick={() => setIsModalOpen((prev) => ({ ...prev, create: true }))}
        >
          <PlusIcon className="h-5 w-5" />
          Add New URL
        </Button>
      </div>
      <Suspense fallback={<UrlTableSkeleton />}>
        <UrlTable
          setIsModalOpen={setIsModalOpen}
          setSelectedUrl={setSelectedUrl}
        />
      </Suspense>

      {isModalOpen.create && (
        <Modal onClose={() => handleClose("create")} title="Create New URL">
          <CreateUrlForm handleClose={handleClose} />
        </Modal>
      )}
      {isModalOpen.edit && (
        <Modal onClose={() => handleClose("edit")} title="Edit URL">
          <EditUrlForm url={selectedUrl} />
        </Modal>
      )}
      {isModalOpen.delete && (
        <Modal onClose={() => handleClose("delete")} title="Delete URL">
          <DeleteUrlForm url={selectedUrl} handleClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}
