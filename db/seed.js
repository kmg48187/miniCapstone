import db from "#db/client";
import { createDepartment } from "./queries/departments";
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

        //add seeding for faculty
        
    };
};