"use client";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "@/context/AuthContext";

export default function AuthButton() {
    const [open, setOpen] = useState(false);
    const { logout} = useAuth()
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                className="btn btn-sm btn-primary"
                onClick={() => setOpen(!open)}
            >
                Profil
            </button>
            {open && (
                <ul className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-md z-[100] backdrop-blur-sm">
                    <li>
                        <Link
                            href="/profile"
                            className="block px-4 py-2 hover:bg-base-200 rounded-t-md"
                            onClick={() => setOpen(false)}
                        >
                            Mon profil
                        </Link>
                    </li>
                    <li>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-base-200 rounded-b-md"
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
