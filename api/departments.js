import express from "express";
import requireBody from "#middleware/requireBody";
const router = express.Router();
export default router;

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "#db/queries/departments";

import { requireUser } from "#middleware/requireUser";
import {
  createFaculty,
  getFacultyByDepartmentId,
  getFacultyById,
  updateFaculty,
} from "#db/queries/faculty";

router
  .route("/")
  .get(async (req, res) => {
    const departments = await getDepartments();
    res.json(departments);
  })
  .post(
    requireUser,
    requireBody(["name", "description", "banner_image", "contact_info"]),
    async (req, res) => {
      const department = await createDepartment(req.body);

      res.status(201).json(department);
    }
  );

router.param("id", async (req, res, next, id) => {
  const department = await getDepartmentById(id);
  if (!department) return res.status(404).send("Department not found.");

  req.department = department;
  next();
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.department);
  })
  .delete(requireUser, async (req, res) => {
    await deleteDepartment(req.department.id);
    res.sendStatus(204);
  })
  .put(requireUser, async (req, res) => {
    const { ...fields } = req.body;

    if (Object.entries(fields).length === 0) {
      return res.status(400).json("No fields found to update.");
    }

    const department = await updateDepartment(req.department.id, fields);

    res.status(200).json(department);
  });

router
  .route("/:id/faculty")
  .get(requireUser, async (req, res) => {
    const faculty = await getFacultyByDepartmentId(req.department.id);

    res.status(200).json(faculty);
  })
  .post(
    requireUser,
    requireBody(["name", "email", "bio", "profile_pic"]),
    async (req, res) => {
      const payload = { department_id: req.department.id, ...req.body };
      const employee = await createFaculty(payload);

      res.status(201).json(employee);
    }
  );
