import "@/styles/globals.css";
import "@/styles/themes.css";
import {ThemeProvider} from "@/context/ThemeContext";
import Header from "@/components/Header";
import {Metadata} from "next";
import Footer from "@/components/Footer";
import {AuthProvider} from "@/context/AuthContext";

export const metadata: Metadata = {
    title: "Picture Poker",
    description: "Un jeu en ligne de cartes inspiré de Mario 64 DS",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body className="min-h-screen flex flex-col">
        <AuthProvider>
            <ThemeProvider>
                <Header/>
                <main className="flex-grow p-4">{children}</main>
                <Footer/>
            </ThemeProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
