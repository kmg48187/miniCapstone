import { getUserById, validateJWT } from "#db/queries/users";

export default async function getUserFromToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next();
  }

  const token = authorization.split(" ")[1];
  const id = await validateJWT(token);

  if (!id) {
    return res.status(403).send("Session expired.");
  }

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).send("Couldn't find a user with that id.");
  }

  req.user = user;
  next();
}
