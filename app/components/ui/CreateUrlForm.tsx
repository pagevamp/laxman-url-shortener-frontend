
'use client';

import { Button } from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { useState } from "react";
import { LinkIcon, CalendarIcon } from "@heroicons/react/24/outline";

type CreateUrlFormData = {
    original_url: string;
    expires_at: string;
};

export default function CreateUrlForm() {
    const [formData, setFormData] = useState<CreateUrlFormData>({
        original_url: "",
        expires_at: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-8 dark:bg-gray-900 rounded-3xl dark:shadow-black/30"
        >
            <p className="text-lg text-gray-700 dark:text-gray-300">
                Enter the URL and set an optional expiry date
            </p>

            <div className="space-y-6">
                <Input
                    id="original_url"
                    name="original_url"
                    type="url"
                    placeholder="https://example.com"
                    onChange={handleChange}
                >
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
                </Input>

                <Input
                    id="expires_at"
                    name="expires_at"
                    type="datetime-local"
                    placeholder="Expiry Date"
                    onChange={handleChange}
                >
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
                </Input>
            </div>

            <Button
                type="submit"
                className="mt-6 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
                Create URL
            </Button>
        </form>
    );
}
