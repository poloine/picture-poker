"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {router} from "next/client";

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
    fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
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
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAccess = localStorage.getItem("accessToken");
        const storedRefresh = localStorage.getItem("refreshToken");

        if (storedAccess && storedRefresh) {
            setAccessToken(storedAccess);
            setRefreshToken(storedRefresh);
            fetchProfile(storedAccess);
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
            console.error("Erreur de récupération du profil :", err);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = (access: string, refresh: string) => {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        setAccessToken(access);
        setRefreshToken(refresh);
        fetchProfile(access);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        router.push("/");
    };

    const refreshAccessToken = async () => {
        if (!refreshToken) return logout();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) return logout();

        const data = await res.json();
        localStorage.setItem("accessToken", data.accessToken);
        setAccessToken(data.accessToken);
        return data.accessToken;
    };

    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
        let token = accessToken;
        if (!token) {
            logout();
            return new Response(null, { status: 401, statusText: "Unauthorized" });
        }

        let res = await fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 401) {
            token = await refreshAccessToken();
            if (!token) {
                logout();
                return new Response(null, { status: 401, statusText: "Unauthorized" });
            }
            res = await fetch(url, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return res;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                refreshToken,
                isAuthenticated: !!user,
                loading,
                login,
                logout,
                fetchWithAuth,
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
