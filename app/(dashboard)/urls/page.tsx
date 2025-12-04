"use client";
import Modal from "@/app/components/ui/Modal";
import CreateUrlForm from "../../components/ui/CreateUrlForm";
import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import UrlTableSkeleton from "@/app/components/UrlTableSkeleton";
import { PlusIcon } from "@heroicons/react/24/outline";
import UrlTable from "../../components/ui/UrlTable";
import EditUrlForm from "@/app/components/ui/EditUrlForm";
import { UrlItem } from "@/app/types/types";
import { Suspense } from "react";

export default function UrlPage() {
  const [isModalOpen, setIsModalOpen] = useState({
    create: false,
    edit: false,
  });

  const [selectedUrl, setSelectedUrl] = useState<UrlItem | null>(null);

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
        <Modal
          onClose={() => setIsModalOpen((prev) => ({ ...prev, create: false }))}
          title="Create New URL"
        >
          <CreateUrlForm />
        </Modal>
      )}
      {isModalOpen.edit && (
        <Modal
          onClose={() => setIsModalOpen((prev) => ({ ...prev, edit: false }))}
          title="Edit URL"
        >
          <EditUrlForm url={selectedUrl} />
        </Modal>
      )}
    </div>
  );
}
