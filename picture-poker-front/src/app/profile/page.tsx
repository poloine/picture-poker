"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const { user, isAuthenticated, loading, logout, fetchWithAuth } = useAuth();
    const router = useRouter();
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [loadingPwd, setLoadingPwd] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push("/login");
        }
    }, [user, isAuthenticated, router]);

    if (loading) return <p className="text-center mt-20">Chargement...</p>;
    if (!user) return <p>Non connecté</p>;

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingPwd(true);
        setMessage(null);

        try {
            const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error ?? "Échec de la mise à jour du mot de passe");
            }

            setMessage({ text: "Mot de passe mis à jour avec succès ✅", type: "success" });
            setCurrentPassword("");
            setNewPassword("");
            setShowPasswordForm(false);
        } catch (err: any) {
            setMessage({ text: err.message ?? "Une erreur est survenue", type: "error" });
        } finally {
            setLoadingPwd(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-base-100 shadow-lg rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Mon profil</h1>

            <div className="space-y-2">
                <p><strong>Nom d’utilisateur :</strong> {user.username}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Score :</strong> {user.score}</p>
                <p><strong>Pièces :</strong> {user.money}</p>
            </div>

            <div className="divider"></div>

            {!showPasswordForm ? (
                <button
                    onClick={() => setShowPasswordForm(true)}
                    className="btn btn-outline btn-primary w-full mt-2"
                >
                    Modifier mon mot de passe
                </button>
            ) : (
                <form onSubmit={handlePasswordChange} className="mt-4 flex flex-col gap-3">
                    <input
                        type="password"
                        placeholder="Mot de passe actuel"
                        className="input input-bordered w-full"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        className="input input-bordered w-full"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary flex-1"
                            disabled={loadingPwd}
                        >
                            {loadingPwd ? "Mise à jour..." : "Valider"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowPasswordForm(false)}
                            className="btn btn-ghost flex-1"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            )}

            {message && (
                <p
                    className={`mt-3 text-sm text-center ${
                        message.type === "success" ? "text-green-600" : "text-error"
                    }`}
                >
                    {message.text}
                </p>
            )}

            <button onClick={logout} className="btn btn-error mt-6 w-full">
                Se déconnecter
            </button>
        </div>
    );
}
