"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function AuthButton() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className="relative">
            <button
                className="btn btn-sm btn-primary"
                onClick={() => setOpen(!open)}
            >
                Profil
            </button>
            {open && (
                <ul className="absolute right-0 mt-2 w-48 bg-base-100 shadow-md rounded-md z-50">
                    <li>
                        <Link
                            href="/profile"
                            className="block px-4 py-2 hover:bg-base-200"
                            onClick={() => setOpen(false)}
                        >
                            Mon profil
                        </Link>
                    </li>
                    <li>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-base-200"
                            onClick={logout}
                        >
                            Déconnexion
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}
