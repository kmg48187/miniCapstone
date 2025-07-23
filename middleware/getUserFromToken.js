import { getUserById, validateJWT } from "#db/queries/users";

export default async function getUserFromToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next();
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = await validateJWT(token);
    const user = await getUserById(id);

    req.user = user;
  } catch (error) {
    console.log(error);
  }

  next();
}
