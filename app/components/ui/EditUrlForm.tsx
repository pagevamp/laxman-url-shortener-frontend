"use client";

import { Button } from "@/app/components/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { DateTimePicker } from "../DatePicker";
import { useEditUrl } from "@/app/hooks/useEditUrl";
import { useAuth } from "@/app/context/AuthContext";
import { editShortUrl } from "@/app/api/url.api";
import { UrlItem } from "@/app/api/interfaces/interfaces";

interface EditUrlForm {
  url: UrlItem | null;
  fetchUrls: (token: string) => Promise<void>;
  handleClose: (value: string) => void;
}

export default function EditUrlForm({
  url,
  fetchUrls,
  handleClose,
}: EditUrlForm) {
  const {
    editForm,
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
    setExpiresAt,
  } = useEditUrl();

  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = handleValidation();
    if (!isValid) return;
    try {
      if (token) {
        setLoading(true);
        await editShortUrl(url?.id!, editForm, token);
        toast.success("Url Edited successfully!");
        fetchUrls(token);
        handleClose("edit");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed Editing URL");
      }
    } finally {
      setLoading(false);
      setError({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-3 dark:bg-gray-900 rounded-3xl dark:shadow-black/30"
    >
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Set a new expiry date for:
      </p>
      <p className="dark:bg-blue-900/30 text-blue-700 dark:text-blue-300  text-sm font-medium truncate">
        {url?.original_url}
      </p>

      <div className="mt-4">
        <DateTimePicker
          setExpiresAt={setExpiresAt}
          initialDate={url?.expires_at ? new Date(url.expires_at) : null}
          error={error?.expires_at}
        />
      </div>

      <Button className="mt-4">
        {loading ? "Saving Changes..." : "Save Changes"}{" "}
        <ArrowRightIcon className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
}
