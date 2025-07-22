import db from "#db/client";
import { createDepartment } from "#db/queries/departments";
import { createFaculty } from "#db/queries/faculty";
import fs from "fs";

await db.connect();
await seed();
await db.end();
console.log("Database seeded.");

async function seed() {
  const imgData = fs.readFileSync("businessman.jpg", { encoding: "base64" });

  for (let i = 1; i < 10; i++) {
    const department = {
      name: "Department" + i,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis commodo elit, in finibus libero. Proin venenatis quam tortor, id euismod ligula dapibus nec.",
      banner_image: imgData,
      contact_info: "fake-email@fake-email.com",
    };
    await createDepartment(
      department.name,
      department.description,
      department.banner_image,
      department.contact_info
    );
  }

  for (let i = 1; i < 10; i++) {
    const faculty = {
      name: "Employee" + i,
      email: "fake-email@fake-email.com",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis commodo elit, in finibus libero. Proin venenatis quam tortor, id euismod ligula dapibus nec.",
      profile_pic: imgData,
      department_id: Math.floor(Math.random() * 10),
    };
    await createFaculty(
      faculty.name,
      faculty.email,
      faculty.bio,
      faculty.profile_pic,
      faculty.department_id
    );
  }
}
