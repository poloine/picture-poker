export default function Footer() {
    return (
        <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t">
            <p>
                © {new Date().getFullYear()} Picture Poker — Fait avec ❤️ par ton équipe
            </p>
        </footer>
    );
}
