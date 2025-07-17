import express from "express";
const app = express();
export default app;

import facultyRouter from "#api/faculty";

app.use(express.json());

app.use("/faculty", facultyRouter);







app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});