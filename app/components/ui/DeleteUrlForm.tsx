"use client";

import { UrlItem } from "@/app/api/interfaces/interfaces";
import { Button } from "@/app/components/Button";
import toast from "react-hot-toast";

interface DeleteUrlForm {
  url: UrlItem | null;
  handleClose: (value: string) => void;
}

export default function DeleteUrlForm({ url, handleClose }: DeleteUrlForm) {
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Url Deleted successfully!");
  };

  return (
    <form className="w-full max-w-md flex flex-col gap-3 dark:bg-gray-900 rounded-3xl dark:shadow-black/30">
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Are you sure you want to delete this url?
      </p>
      <p className=" text-blue-700 dark:text-blue-200  text-sm font-medium truncate">
        {url?.original_url}
      </p>
      <div className="flex gap-[10%] mx-5 justify-around">
        <Button
          onClick={handleConfirm}
          className="mt-4 w-full bg-red-100! border border-red-500! text-red-500! hover:bg-red-500! hover:text-red-100! shadow-red-600/30! hover:scale-105"
        >
          Confirm
        </Button>
        <Button
          onClick={() => handleClose("delete")}
          className="mt-4 w-full bg-blue-100! border border-blue-500! text-blue-500! hover:bg-blue-500! hover:text-blue-100! shadow-blue-600/30! hover:scale-105"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
