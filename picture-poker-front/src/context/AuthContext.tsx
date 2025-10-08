"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {router} from "next/client";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface User {
    username: string;
    email: string;
    role: string;
    score: number;
    money: number;
    created_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("token");
        if (stored) {
            setToken(stored);
            fetchProfile(stored);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async (tkn: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${tkn}` },
            });
            if (!res.ok) throw new Error("Unauthorized");
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error("❌ Erreur de récupération du profil :", err);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        fetchProfile(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token && !!user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
