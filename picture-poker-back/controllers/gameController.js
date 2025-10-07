import prisma from "../prisma/client.js";

export const getGameDetail = async (req, res) => {
    const { uuid } = req.params;

    try {
        const game = await prisma.game.findUnique({
            where: { uuid },
            include: {
                players: {
                    include: { user: true }
                },
                round: true
            }
        });

        if (!game) return res.status(404).json({ error: "Game not found" });

        // Vérifier si l'utilisateur a participé à la partie
        const isPlayer = game.players.some(p => p.user_id === req.user.id);
        if (!isPlayer) return res.status(403).json({ error: "Not allowed" });

        res.json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
