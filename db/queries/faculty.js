import db from "#db/client";

export async function getFaculty() {
  const sql = `
  SELECT *
  FROM faculty
  `;
  const { rows: faculty } = await db.query(sql);
  return faculty;
}

export async function getFacultyById(id) {
  const sql = `
  SELECT *
  FROM faculty
  WHERE id = $1
  `;
  const {
    rows: [faculty],
  } = await db.query(sql, [id]);

  return faculty;
}

export async function getFacultyByDepartmentId(id) {
  const sql = `
  SELECT *
  FROM faculty
  WHERE department_id = $1
  `;
  const { rows } = await db.query(sql, [id]);

  return rows;
}

export async function updateFaculty(id, fields) {
  const allowed = ["name", "email", "bio", "profile_pic", "department_id"];
  const updates = Object.entries(fields).filter(
    ([k, v]) => v !== undefined && v !== null && allowed.includes(k)
  );

  if (updates.length === 0) {
    throw new Error("No valid fields to update.");
  }

  const sets = updates.map(([key], i) => `${key} = $${i + 2}`);
  const values = updates.map(([_, value]) => value);

  const SQL = `
    UPDATE faculty
    SET ${sets.join(", ")}
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [faculty],
  } = await db.query(SQL, [id, ...values]);

  console.log("Sets: ", sets);
  console.log("Updates: ", updates);
  console.log("Values: ", values);
  console.log("SQL: ", SQL);
  console.log("Faculty: ", faculty);

  return faculty || undefined;
}

export async function createFaculty({
  name,
  email,
  bio,
  profile_pic,
  department_id,
}) {
  const sql = `
  INSERT INTO faculty
    (name, email, bio, profile_pic, department_id)
  VALUES
    ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const {
    rows: [faculty],
  } = await db.query(sql, [name, email, bio, profile_pic, department_id]);
  return faculty;
}
