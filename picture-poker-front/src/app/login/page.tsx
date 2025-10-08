"use client";

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {useAuth} from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/profile");
        }
    }, [isAuthenticated, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Erreur de connexion");

            login(data.accessToken, data.refreshToken);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-base-100 shadow-xl rounded-xl p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    className="input input-bordered w-full"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                {error && <p className="text-error text-sm">{error}</p>}

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>

            <p className="text-center mt-4 text-sm">
                Pas encore de compte ?{" "}
                <a href="/register" className="text-primary hover:underline">
                    Inscrivez-vous
                </a>
            </p>
        </div>
    );
}
