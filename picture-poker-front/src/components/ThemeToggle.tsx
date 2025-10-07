"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme") || "dark";
        document.querySelector("html")?.setAttribute("data-theme", saved);
        setTheme(saved);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        document.querySelector("html")?.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return (
        <button className="btn btn-ghost btn-sm" onClick={toggleTheme}>
            {theme === "dark" ? "🌞" : "🌙"}
        </button>
    );
}
