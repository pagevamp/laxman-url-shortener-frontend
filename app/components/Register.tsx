'use client'

import { useRouter } from 'next/navigation'
import {
    AtSymbolIcon,
    UserIcon,
    FaceSmileIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './Button';
import Input from './ui/Input';
import useRegisterFormFields from '../hooks/useRegisterFormFields';
import { registerFormSchema } from '../lib/zodSchemas/register.schema';
import { RegisterUser } from '../api/auth.api';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
export default function Register() {
    const router = useRouter()
    const { name, email, setName, setEmail, password, setPassword, username, setUsername, loading, setLoading, error, setError } = useRegisterFormFields();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = registerFormSchema.safeParse({ name, username, email, password });
        if (!result.success) {
            const fieldErrors = z.treeifyError(result.error);
            setError({
                name: fieldErrors.properties?.name?.errors[0],
                username: fieldErrors.properties?.username?.errors[0],
                email: fieldErrors.properties?.email?.errors[0],
                password: fieldErrors.properties?.password?.errors[0],
            });
            return;
        }

        setLoading(true);

        try {
            const data = await RegisterUser({ name, username, email, password });
            console.log(data.message)
            toast.success(data.message)
            router.push('/login');
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Registration failed");
            }
        } finally {
            setLoading(false)
            setError({})
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6 px-8 py-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Sign up with your details.
            </h1>
            <div className="space-y-4">
                <Input type="text" id="name" name="name" placeholder="Full Name" onChange={(e) => { setName(e.target.value) }}>
                    <FaceSmileIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-900" />
                </Input>
                {error?.name && <p className="text-red-500 text-xs -mt-3">{error.name}</p>}

                <Input type="text" id="username" name="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}>
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-900" />
                </Input>
                {error?.username && <p className="text-red-500 text-xs -mt-3">{error.username}</p>}

                <Input
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                >
                    <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-900" />
                </Input>
                {error?.email && <p className="text-red-500 text-xs -mt-3">{error.email}</p>}

                <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                >
                    <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-900" />
                </Input>
                {error?.password && <p className="text-red-500 text-xs -mt-3">{error.password}</p>}
            </div>
            <Button className="mt-6 w-full flex items-center justify-center">
                {loading ? 'Signing up' : 'Sign Up'} <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
             <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Login
        </Link>
      </p>
        </form >
    );
}

