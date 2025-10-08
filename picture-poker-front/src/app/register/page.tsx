"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erreur d’inscription");

            setSuccess("Inscription réussie ! Vérifiez votre email pour valider votre compte.");
            setForm({ username: "", email: "", password: "" });

            // Optionnel : redirige après quelques secondes
            setTimeout(() => router.push("/login"), 2500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-base-100 shadow-xl rounded-xl p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d’utilisateur"
                    className="input input-bordered w-full"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
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
                {success && <p className="text-success text-sm">{success}</p>}

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? "Inscription..." : "Créer un compte"}
                </button>
            </form>

            <p className="text-center mt-4 text-sm">
                Déjà un compte ?{" "}
                <a href="/login" className="text-primary hover:underline">
                    Connectez-vous
                </a>
            </p>
        </div>
    );
}
