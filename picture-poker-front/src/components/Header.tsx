"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthButton from "./AuthButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <header className="navbar bg-base-100 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary">
                    🎴 Picture Poker
                </Link>

                <nav className="flex items-center gap-4">
                    {isLoggedIn ? (
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
            </div>
        </header>
    );
}

