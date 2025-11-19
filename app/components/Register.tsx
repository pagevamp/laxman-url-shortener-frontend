'use client'
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
import {  registerFormSchema } from '../lib/zodSchemas/register.schema';
import { RegisterUser } from '../services/auth.service';

export default function Register() {
    const { name, email, setName, setEmail, password, setPassword, username, setUsername,loading, setLoading, error, setError } = useRegisterFormFields();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = registerFormSchema.safeParse({ name, username, email, password });
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setError({
                name: fieldErrors.name?.[0],
                username: fieldErrors.username?.[0],
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            });
            return;
        }

        try {
            const res = await RegisterUser({ name, username, email, password });
            console.log(res)
            console.log("the response is: ", res)
        } catch (err: any) {
            setError({
                ...error,
                server: err?.response?.data?.message || "Registration failed. Try again."
            });
        }finally{
            setLoading(false)
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
        </form >
    );
}
