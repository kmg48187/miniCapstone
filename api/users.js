import { createJWT, createUser, validateAccount } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import express from "express";
const router = express.Router();

router.post(
  "/register",
  requireBody(["username", "email", "password", "is_admin"]),
  async (req, res) => {
    const user = await createUser(req.body);

    res.status(201).json(user);
  }
);

router.post("/login", requireBody(["email", "password"]), async (req, res) => {
  const user = await validateAccount(req.body);

  if (!user) {
    return res.status(401).send("Incorrect email or password.");
  }

  res.status(200).json(createJWT(user.id));
});

export default router;
