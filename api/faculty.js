import express from "express";
const router = express.Router();
export default router;

import { getFaculty, getFacultyById } from "#db/queries/faculty";

router.route("/").get(async (req, res) => {
  const faculty = await getFaculty();
  res.send(faculty);
});

router.route("/:id").get(async (req, res) => {
  const faculty = await getFacultyById(req.params.id);
  if (!faculty) return res.status(404).send("Faculty member not found.");
  res.send(faculty);
});