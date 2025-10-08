"use client";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function ProfilePage() {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push("/login");
        }
    }, [user, isAuthenticated, router]);

    if (loading) return <p className="text-center mt-20">Chargement...</p>;
    if (!user) return <p>Non connecté</p>;

    return (
        <div className="max-w-lg mx-auto bg-base-100 shadow-lg rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Mon profil</h1>
            <p><strong>Nom d’utilisateur :</strong> {user.username}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Score :</strong> {user.score}</p>
            <p><strong>Pièces :</strong> {user.money}</p>
            <button onClick={logout} className="btn btn-error mt-6 w-full">
                Se déconnecter
            </button>
        </div>
    );
}
