import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t flex justify-between">
            <p>
                © {new Date().getFullYear()} Picture Poker - Made by Poloine
            </p>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
        </footer>
    );
}
