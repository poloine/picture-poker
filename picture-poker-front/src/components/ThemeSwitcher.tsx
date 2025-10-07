"use client";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const themes = ["flat", "dark", "skeuo"] as const;

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-outline">
                🎨 {theme}
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-32"
            >
                {themes.map((t) => (
                    <li key={t}>
                        <button
                            onClick={() => setTheme(t)}
                            className={theme === t ? "text-primary font-bold" : ""}
                        >
                            {t}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
