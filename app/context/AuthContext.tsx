"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
    loggedIn: boolean | null;
    setLoggedIn: (value: boolean) => void;
    token: string | null;
    setToken:(value:string) =>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get("/api/authCheck", {
                    withCredentials: true,
                });
                setLoggedIn(res.data.loggedIn);
                setToken(res.data.token);
            } catch (err) {
                setLoggedIn(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};