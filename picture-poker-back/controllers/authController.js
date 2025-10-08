import prisma from "../prisma/client.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import {sendPasswordResetEmail, sendVerificationEmail} from "../utils/mailer.js";
import { randomUUID } from "crypto";
import mjml2html from "mjml";
import {generateAccessToken, generateRefreshToken, verifyToken} from "../utils/jwt.js";


const authController = {
    register: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const existing = await prisma.user.findUnique({ where: { email } });
            if (existing) return res.status(400).json({ error: "Email already in use" });

            const password_hash = await hashPassword(password);
            const verificationToken = randomUUID();

            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password_hash,
                    verificationToken,
                },
            });

            await sendVerificationEmail(user, verificationToken);

            res.json({ message: "User registered. Please verify your email before logging in." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    verifyEmail: async (req, res) => {
        const { token } = req.params;

        try {
            const user = await prisma.user.findFirst({ where: { verificationToken: token } });
            if (!user) return res.status(400).json({ error: "Invalid or expired verification token" });

            await prisma.user.update({
                where: { id: user.id },
                data: { isVerified: true, verificationToken: null },
            });

            const { html } = mjml2html(mjmlVerifiedTemplate)
            res.send(html);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(400).json({ error: "Invalid credentials" });

            if (!user.isVerified)
                return res.status(401).json({ error: "Please verify your email first." });

            const valid = await comparePassword(password, user.password_hash);
            if (!valid) return res.status(400).json({ error: "Invalid credentials" });

            const accessToken = generateAccessToken(user);
            const refreshToken = await generateRefreshToken(user);

            await prisma.refreshToken.create({
                data: {
                    userId: user.id,
                    token: refreshToken,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });

            res.json({ message: "Logged in", accessToken, refreshToken });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    logout: async (req, res) => {
        const { refreshToken } = req.body;
        if (refreshToken) {
            await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
        }
        res.json({ message: "Logged out" });
    },

    forgotPassword: async (req, res) => {
        const { email } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user)
                return res.status(404).json({ error: "Aucun compte associé à cet email" });

            const resetToken = randomUUID();
            const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: expires,
                },
            });

            await sendPasswordResetEmail(user, resetToken);

            res.json({ message: "Un email de réinitialisation a été envoyé." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    resetPassword: async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;

        try {
            const user = await prisma.user.findFirst({
                where: {
                    resetPasswordToken: token,
                    resetPasswordExpires: { gt: new Date() },
                },
            });

            if (!user)
                return res.status(400).json({ error: "Lien invalide ou expiré" });

            const password_hash = await hashPassword(password);

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    password_hash,
                    resetPasswordToken: null,
                    resetPasswordExpires: null,
                },
            });

            res.json({ message: "Mot de passe réinitialisé avec succès !" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    refreshToken: async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) return res.status(401).json({ error: "No token provided" });

        try {
            const stored = await prisma.refreshToken.findUnique({
                where: { token: refreshToken },
                include: { user: true },
            });

            if (!stored) return res.status(403).json({ error: "Invalid token" });
            if (new Date() > stored.expiresAt)
                return res.status(403).json({ error: "Token expired" });

            const valid = verifyToken(refreshToken, true);
            if (!valid) return res.status(403).json({ error: "Invalid token" });

            const newAccessToken = generateAccessToken(stored.user);
            res.json({ accessToken: newAccessToken });
        } catch (err) {
            console.error(err);
            res.status(403).json({ error: "Invalid refresh token" });
        }
    }
};

export default authController;
