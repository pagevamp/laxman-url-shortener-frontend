'use client';

import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from './Button';
import Input from "./ui/Input";
import { ResendMail } from "../api/auth.api";
import { z } from 'zod';
import toast from "react-hot-toast";
import { useState } from "react";
import { VerifyEmailActionState, verifyEmailFormSchema } from "../lib/zodSchemas/verify-email.schema";

export default function VerifyEmailForm() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<VerifyEmailActionState["errors"]>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = verifyEmailFormSchema.safeParse({ email });
            if (!result.success) {
                const fieldErrors = z.treeifyError(result.error);
                setError({
                    email: fieldErrors.properties?.email?.errors[0],
                });
                return;
            }
            setLoading(true)
            await toast.promise(
                ResendMail({ email }),
                {
                    loading: "Sending verification mail...",
                    success: "Verification mail sent. Please verify!",
                    error: (err) =>
                        err instanceof Error ? err.message : "Failed to send email",
                }
            );
                setError({});
        } catch (err) {
                
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6 px-8 py-12 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                Enter your email here
            </h1>
            <p className="text-xl text-gray-900 dark:text-gray-100">Verification email will be sent to your email account.</p>

            <div className="space-y-4">
                <Input
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                >
                    <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </Input>
                {error?.email && <p className="text-red-500 text-xs -mt-3">{error.email}</p>}


            </div>

            <Button className="mt-6">
                {loading ? "Sending verification mail..." : "Send verification mail"} <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
        </form>
    );
}
