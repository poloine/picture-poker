import express from "express";

const router = express.Router();

router.get('/', function(req, res)  {
    res.send("Picture Poker API is running ✅");
});

export default router;
