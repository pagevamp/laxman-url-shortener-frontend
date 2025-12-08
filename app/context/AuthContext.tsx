"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { checkLoggedIn } from "../api/auth.api";

interface AuthContextType {
  loggedIn: boolean | null;
  setLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await checkLoggedIn();
        setLoggedIn(res.loggedIn);
      } catch (err) {
        setLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
