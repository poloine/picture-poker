import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Picture Poker",
    description: "Un jeu de cartes inspiré de Mario 64 DS, maintenant en ligne",
};

export default function RootLayout({children,}: { children: React.ReactNode; }) {
    return (
        <html lang="fr" data-theme="dark">
        <body className="flex flex-col min-h-screen bg-base-200 text-base-content">
        <Header/>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <Footer/>
        </body>
        </html>
    );
}
