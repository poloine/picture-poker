// middlewares/authMiddleware.js
import { extractBearerToken, verifyToken } from "../utils/jwt.js";
import prisma from "../prisma/client.js";

export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing token" });

    const token = extractBearerToken(req.headers.authorization);
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const decoded = verifyToken(token);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) return res.status(401).json({ error: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid token" });
    }
};
