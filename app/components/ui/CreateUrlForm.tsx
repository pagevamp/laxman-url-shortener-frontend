
'use client';

import { Button } from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { LinkIcon, CalendarIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useCreateUrl } from "@/app/hooks/useCreateUrl";
import toast from "react-hot-toast";

export default function CreateUrlForm() {
    const { form, setForm, handleValidation,
        loading,
        setLoading,
        error,
        setError,
    } = useCreateUrl()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = handleValidation();
        if (!isValid) return;
        try {
            setLoading(true);
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
    }


    return (
        <form onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-8 dark:bg-gray-900 rounded-3xl dark:shadow-black/30"
        >
            <p className="text-lg text-gray-700 dark:text-gray-300">
                Enter the URL and set an optional expiry date
            </p>

            <div className="space-y-6">
                <Input
                    id="originalUrl"
                    name="originalUrl"
                    placeholder="https://example.com"
                    onChange={handleChange}
                >
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </Input>
                {error?.originalUrl && <p className="text-red-500 text-xs -mt-3">{error.originalUrl}</p>}

                <Input
                    id="expires_at"
                    name="expires_at"
                    type="datetime-local"
                    placeholder="Expiry Date"
                    onChange={handleChange}
                >
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </Input>
                {error?.expiresAt && <p className="text-red-500 text-xs -mt-3">{error.expiresAt}</p>}

            </div>

            <Button className="mt-6">
                {loading ? "Creating Short Url..." : "Create Short Url"} <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
        </form>
    );
}
