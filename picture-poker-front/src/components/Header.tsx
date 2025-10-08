"use client";
import Link from "next/link";
import AuthButton from "./AuthButton";
import ThemeToggle from "./ThemeToggle";
import {useAuth} from "@/context/AuthContext";

export default function Header() {
    const { isAuthenticated, loading } = useAuth();

    return (
        <header className="navbar bg-base-100 shadow-md">
            <div className="container mx-auto my-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary">
                    🎴 Picture Poker
                </Link>

                {!loading && (
                    <nav className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <Link href="/game/new" className="hover:text-primary">
                                    Créer un salon
                                </Link>
                                <Link href="/game/join" className="hover:text-primary">
                                    Rejoindre
                                </Link>
                                <AuthButton />
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-primary">Connexion</Link>
                                <Link href="/register" className="hover:text-primary">Inscription</Link>
                            </>
                        )}
                        <ThemeToggle />
                    </nav>
                )}
            </div>
        </header>
    );
}

