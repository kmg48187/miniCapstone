import db from "#db/client";

export async function createDepartment({
  name,
  description,
  banner_image,
  contact_info,
}) {
  const sql = `
    INSERT INTO departments
       (name, description, banner_image, contact_info)
    VALUES
        ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [department],
  } = await db.query(sql, [name, description, banner_image, contact_info]);
  return department;
}

export async function getDepartments() {
  const sql = `
    SELECT * FROM departments
    `;
  const { rows } = await db.query(sql);

  return rows;
}

export async function getDepartmentById(id) {
  const sql = `
        SELECT *
        FROM departments
        WHERE id = $1
        `;

  const {
    rows: [department],
  } = await db.query(sql, [id]);

  return department;
}

export async function updateDepartment(id, fields) {
  const allowed = ["name", "description", "banner_image", "contact_info"];
  const updates = Object.entries(fields).filter(
    ([k, v]) => v !== undefined && v !== null && allowed.includes(k)
  );

  if (updates.length === 0) {
    throw new Error("No valid fields to update.");
  }

  const sets = updates.map(([key], i) => `${key} = $${i + 2}`);
  const values = updates.map(([_, value]) => value);

  const SQL = `
    UPDATE departments
    SET ${sets.join(", ")}
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [department],
  } = await db.query(SQL, [id, ...values]);

  return department || undefined;
}

export async function deleteDepartment(id) {
  const sql = `
    DELETE FROM departments
    WHERE id = $1
    RETURNING * 
    `;
  const {
    rows: [department],
  } = await db.query(sql, [id]);

  return department;
}
