import prisma from "../prisma/client.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

const authController = {
    register: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const existing = await prisma.user.findUnique({ where: { email } });
            if (existing) return res.status(400).json({ error: "Email already in use" });

            const password_hash = await hashPassword(password);
            const user = await prisma.user.create({
                data: { username, email, password_hash },
            });

            const token = generateToken(user);
            res.json({ message: "User registered", token });
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

            const valid = await comparePassword(password, user.password_hash);
            if (!valid) return res.status(400).json({ error: "Invalid credentials" });

            const token = generateToken(user);
            res.json({ message: "Logged in", token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

export default authController;
