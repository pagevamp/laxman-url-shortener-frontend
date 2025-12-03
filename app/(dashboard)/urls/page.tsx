"use client";
import Modal from "@/app/components/ui/Modal";
import CreateUrlForm from "../../components/ui/CreateUrlForm";
import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import UrlTable from "../../components/ui/UrlTable";

export default function UrlPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mx-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Shortened URLs
        </h1>
        <Button
          className="flex items-center gap-2 p-3! bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="h-5 w-5" />
          Add New URL
        </Button>
      </div>

      <UrlTable />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Create New URL">
          <CreateUrlForm />
        </Modal>
      )}
    </div>
  );
}
