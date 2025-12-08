"use client";

import { Button } from "@/app/components/Button";
import Input from "@/app/components/ui/Input";
import { LinkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useCreateUrl } from "@/app/hooks/useCreateUrl";
import toast from "react-hot-toast";
import { DateTimePicker } from "../DatePicker";
import { createShortUrl } from "@/app/api/url.api";
import { useAuth } from "@/app/context/AuthContext";

interface CreateUrlForm {
  handleClose: (value: string) => void;
  fetchUrls: (token: string) => Promise<void>;
}

export default function CreateUrlForm({
  handleClose,
  fetchUrls,
}: CreateUrlForm) {
  const {
    form,
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
    handleChange,
    setExpiresAt,
  } = useCreateUrl();
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = handleValidation();
    if (!isValid) return;
    try {
      if (token) {
        setLoading(true);
        await createShortUrl(form, token);
        toast.success("Short Url created successfully!");
        fetchUrls(token);
        handleClose("create");
      }
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
          error={error?.original_url}
        >
          <LinkIcon className="absolute top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </Input>

        <DateTimePicker error={error?.expires_at} setExpiresAt={setExpiresAt} />
      </div>

      <Button className="mt-6">
        {loading ? "Creating Short Url..." : "Create Short Url"}{" "}
        <ArrowRightIcon className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
}
