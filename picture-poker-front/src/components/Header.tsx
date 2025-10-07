"use client";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 shadow-md bg-base-100">
            <Link href="/" className="font-bold text-xl">
                🎴 Picture Poker
            </Link>

            <nav className="flex gap-4 items-center">
                <Link href="/login">Connexion</Link>
                <Link href="/register">Inscription</Link>
                <ThemeSwitcher />
            </nav>
        </header>
    );
}
