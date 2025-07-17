import { requireUser } from "#middleware/requireUser";
import express from "express";
const router = express.Router();

router.get("/auth", requireUser, async (req, res) => {
    res.status(200).send("Gateway accessed");
});

export default router;