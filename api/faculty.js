import express from "express";
const router = express.Router();
export default router;

import { deleteFacultyById, getFaculty, getFacultyById, updateFaculty } from "#db/queries/faculty";
import { requireUser } from "#middleware/requireUser";

router.route("/").get(async (req, res) => {
  const faculty = await getFaculty();
  res.send(faculty);
});

router.param("id", async (req, res, next, id) => {
  const faculty = await getFacultyById(id);

  if (!faculty)
    return res.status(404).json("A faculty with that id does not exist.");

  req.faculty = faculty;
  next();
});

router
  .route("/:id")
  .get(async (req, res) => {
    res.status(200).json(req.faculty);
  })
  .delete(async (req, res) => {
    await deleteFacultyById(req.faculty.id);
    res.status(204);
  })
  .put(requireUser, async (req, res) => {
    const { ...fields } = req.body;

    if (Object.entries(fields).length === 0) {
      return res.status(400).json("No fields found to update.");
    }

    const faculty = await updateFaculty(req.faculty.id, fields);

    res.status(200).json(faculty);
  });