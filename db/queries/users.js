import db from "#db/client";
import jwt from "jsonwebtoken";

export async function createUser({ username, email, password, is_admin }) {
  const SQL = `
    INSERT INTO users(username, email, password, is_admin)
    VALUES($1, $2, crypt($3, gen_salt('bf')), $4)
    RETURNING *
    `;

  const {
    rows: [user],
  } = await db.query(SQL, [username, email, password, is_admin]);

  return user;
}

export async function getUserById(id) {
  const SQL = `
    SELECT *
    FROM users
    WHERE id = $1
    `;

  const {
    rows: [user],
  } = await db.query(SQL, [id]);

  return user;
}

export async function validateAccount({ email, password }) {
  const SQL = `
    SELECT *
    FROM users
    WHERE email = $1 AND password = crypt($2, password)
    `;

  const {
    rows: [user],
  } = await db.query(SQL, [email, password]);

  return user || undefined;
}

export function createJWT(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });

  return token;
}

export async function validateJWT(token) {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    return verify.id;
  } catch (error) {
    return null;
  }
}
