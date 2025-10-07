import prisma from "../prisma/client.js";

export const getProfile = async (req, res) => {
    const user = req.user;
    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        score: user.score,
        money: user.money,
        profile_picture: user.profile_picture,
        created_at: user.created_at
    });
};

export const getGameHistory = async (req, res) => {
    try {
        const games = await prisma.game_player.findMany({
            where: { user_id: req.user.id },
            include: {
                game: {
                    include: { players: true, created_by: true }
                }
            },
            orderBy: { id: "desc" }
        });

        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
