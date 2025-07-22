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
  SELECT faculty.*
  FROM
    faculty
    JOIN department_faculty ON department_faculty.faculty_id = faculty.id
    JOIN department ON department.id = department_faculty.department_id
  WHERE department.id = $1
  `;
  const { rows: faculty } = await db.query(sql, [id]);
  return faculty;
}

export async function createFaculty(
  name,
  email,
  bio,
  profile_pic,
  department_id
) {
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
