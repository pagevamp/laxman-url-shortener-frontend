"use client";

import { Button } from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { LinkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useCreateUrl } from "@/app/hooks/useCreateUrl";
import toast from "react-hot-toast";
import { DateTimePicker } from "../DatePicker";
import { createShortUrl } from "@/app/api/url.api";

export default function CreateUrlForm() {
  const {
    form,
    setForm,
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
    handleChange,
    setExpiresAt,
  } = useCreateUrl();
  const token = process.env.NEXT_PUBLIC_TOKEN || "";
  const formatDateForDisplay = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = handleValidation();
    if (!isValid) return;
    try {
      setLoading(true);
      const expiryDate = formatDateForDisplay(form.expires_at);
      console.log(expiryDate);
      await createShortUrl(form, token);
      toast.success("Short Url created successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed shortening URL");
      }
    } finally {
      setLoading(false);
      setError({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-8 dark:bg-gray-900 rounded-3xl dark:shadow-black/30"
    >
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Enter the URL and set an expiry date
      </p>

      <div className="space-y-6">
        <Input
          id="original_url"
          name="original_url"
          placeholder="https://example.com"
          onChange={handleChange}
        >
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </Input>
        {error?.original_url && (
          <p className="text-red-500 text-xs -mt-3">{error.original_url}</p>
        )}

        <DateTimePicker setExpiresAt={setExpiresAt} />
        {error?.expires_at && (
          <p className="text-red-500 text-xs -mt-3">{error.expires_at}</p>
        )}
      </div>

      <Button className="mt-6">
        {loading ? "Creating Short Url..." : "Create Short Url"}{" "}
        <ArrowRightIcon className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
}
