import express from "express";
import morgan from "morgan";
import cors from "cors";
import getUserFromToken from "#middleware/getUserFromToken";
import testRouter from "#api/test";
import usersRouter from "#api/users";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/test", testRouter);

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


export default app;