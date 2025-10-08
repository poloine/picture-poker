import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Génère un token d'accès court (15min)
 */
export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
};

/**
 * Génère un refresh token long (7 jours)
 */
export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
};

/**
 * Vérifie un token (access ou refresh selon le secret utilisé)
 */
export const verifyToken = (token, isRefresh = false) => {
    try {
        const secret = isRefresh
            ? process.env.JWT_REFRESH_SECRET
            : process.env.JWT_SECRET;
        return jwt.verify(token, secret);
    } catch (err) {
        console.error(err);
        throw new Error("Unable to verify token");
    }
};

/**
 * Extrait le token du header "Authorization: Bearer ..."
 */
export const extractBearerToken = (header) => {
    if (!header || !header.startsWith("Bearer ")) return null;
    return header.split(" ")[1];
};
