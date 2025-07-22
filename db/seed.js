import db from "#db/client";
import { createDepartment } from "#db/queries/departments";
import { createFaculty } from "#db/queries/faculty";
import fs from "fs";

await db.connect();
await seed();
await db.end();
console.log("Database seeded.");

async function seed() {
  for (let i = 1; i < 10; i++) {
    const department = {
      name: "Department" + i,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis commodo elit, in finibus libero. Proin venenatis quam tortor, id euismod ligula dapibus nec.",
      banner_image: "https://i.pravatar.cc/300",
      contact_info: "fake-email@gmail.com",
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
      email: "fake-email@gmail.com",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis commodo elit, in finibus libero. Proin venenatis quam tortor, id euismod ligula dapibus nec.",
      profile_pic: "https://i.pravatar.cc/300",
      department_id: Math.floor(Math.random() * 9) + 1,
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
