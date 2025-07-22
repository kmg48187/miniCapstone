import express from "express";
import facultyRouter from "#api/faculty";
import morgan from "morgan";
import cors from "cors";
import getUserFromToken from "#middleware/getUserFromToken";
import testRouter from "#api/test";
import usersRouter from "#api/users";
import departmentsRouter from "#api/departments";

const app = express();
export default app;

app.use(cors({ origin: "/localhost/3000" }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/test", testRouter);
app.use("/faculty", facultyRouter);
app.use("/departments", departmentsRouter);

app.get("/", (req, res) => {
  res.send("API Online ✅");
});

app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);
    case "23505":
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
