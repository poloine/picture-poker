"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function AuthButton() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
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


    const getTitle = (score: number) => {
        if (score >= 1000) return "Grand Master";
        if (score >= 500) return "Master";
        if (score >= 200) return "Expert";
        if (score >= 100) return "Intermediate";
        return "Rookie";
    };


    const getProfilePictureUrl = (blob?: Blob | string) => {
        if (!blob) return "/default-avatar.png"; // image par défaut
        if (typeof blob === "string") return blob;
        return URL.createObjectURL(blob);
    };

    const title = user ? getTitle(user.score || 0) : "";
    const profileUrl = getProfilePictureUrl(user?.profile_picture);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-gradient-to-r bg-emerald-300 from-transparent to-emerald-300 hover:bg-green-400 transition-all duration-200 cursor-pointer"
            >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20">
                    <Image
                        src={profileUrl}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Infos utilisateur */}
                <div className="text-left leading-tight">
                    <div className="text-m font-semibold text-black">
                        {user?.username ?? "Invité"}
                    </div>
                    <div className="text-s text-black flex flex-nowrap items-center">
                        {title} – {user?.money ?? 0}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9377 15.9377C19.3603 15.4795 22 12.548 22 9C22 5.13401 18.866 2 15 2C11.452 2 8.52049 4.63967 8.06227 8.06227M16 15C16 18.866 12.866 22 9 22C5.13401 22 2 18.866 2 15C2 11.134 5.13401 8 9 8C12.866 8 16 11.134 16 15Z" stroke="#000000"
                                  fill="#FFDF20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </button>

            {/* Menu déroulant */}
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
