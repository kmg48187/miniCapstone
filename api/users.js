import {
  createJWT,
  createUser,
  getUserById,
  validateAccount,
  validateJWT,
} from "#db/queries/users";
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

router.post("/me", requireBody(["jwt"]), async (req, res) => {
  const { jwt } = req.body;

  try {
    const { id } = await validateJWT(jwt);
    const user = await getUserById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("There was an error verifying that token.");
  }
});

export default router;
