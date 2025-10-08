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
        <button className="btn btn-ghost btn-sm w-6 h-6" onClick={toggleTheme}>
            {
                theme === "dark"
                    ?
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Environment / Sun">
                            <path id="Vector"
                                  d="M12 4V2M12 20V22M6.41421 6.41421L5 5M17.728 17.728L19.1422 19.1422M4 12H2M20 12H22M17.7285 6.41421L19.1427 5M6.4147 17.728L5.00049 19.1422M12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17Z"
                                  stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    : <svg viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M3.39703 11.6315C3.39703 16.602 7.42647 20.6315 12.397 20.6315C15.6858 20.6315 18.5656 18.8664 20.1358 16.23C16.7285 17.3289 12.6922 16.7548 9.98282 14.0455C7.25201 11.3146 6.72603 7.28415 7.86703 3.89293C5.20697 5.47927 3.39703 8.38932 3.39703 11.6315ZM21.187 13.5851C22.0125 13.1021 23.255 13.6488 23 14.5706C21.7144 19.2187 17.4543 22.6315 12.397 22.6315C6.3219 22.6315 1.39703 17.7066 1.39703 11.6315C1.39703 6.58874 4.93533 2.25845 9.61528 0.999986C10.5393 0.751502 11.0645 1.99378 10.5641 2.80935C8.70026 5.84656 8.83194 10.0661 11.397 12.6312C13.9319 15.1662 18.1365 15.3702 21.187 13.5851Z"
                              fill="#0F0F0F"/>
                    </svg>
            }
        </button>
    );
}
