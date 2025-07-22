import db from "#db/client";
import { createDepartment } from "#queries/departments";
import { createFaculty } from "./queries/faculty";
import { createFaculty } from "./queries/faculty";

await db.connect();
await seed();
await db.end();
console.log("Database seeded.");

async function seed() {
    const imgData = fs.readFileSync('#businessman.jpg', {encoding: 'base64'});

    for(let i = 0; i < 10; i++) {
        const department = {
            name: "Department" + i,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis commodo elit, in finibus libero. Proin venenatis quam tortor, id euismod ligula dapibus nec.",
            images: imgData,
            contact_info: "fake-email@fake-email.com"
        };
            await createDepartment(department);

        for(let i = 0; i < 10; i++) {
        const faculty = {
            name: "Employee" + i, 
            email: "fake-email@fake-email.com",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis commodo elit, in finibus libero. Proin venenatis quam tortor, id euismod ligula dapibus nec.",
            profile_pic: imgData,
            departmen_id: Math.floor(Math.random() * 10),
        };
            await createFaculty(faculty);
    };
}};