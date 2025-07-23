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
  where id = $1
  `;
  const { rows: faculty } = await db.query(sql, [id]);
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
