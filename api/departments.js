import express from "express";
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

router
  .route("/")
  .get(async (req, res) => {
    const departments = await getDepartments();
    res.send(departments);
  })
  .post(requireUser, async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is requied.");

    const { name, description, banner_image, contact_info } = req.body;
    if (!name || !description || !banner_image || !contact_info)
      return res
        .status(400)
        .send(
          "Missing required fields: name, description, banner_image, contact_info."
        );
    const department = await createDepartment({
      name,
      description,
      banner_image,
      contact_info,
    });
    res.status(201).send(department);
  });

router.param("id", async (req, res, next, id) => {
  const department = getDepartmentById(id);
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
    if (!req.body) return res.status(400).send("Request body is requied.");

    const { name, description, images, contact_info } = req.body;
    if (!name || !description || !banner_image || !contact_info)
      return res
        .status(400)
        .send(
          "Missing required fields: name, description, images, contact_info."
        );

    const department = await updateDepartment({
      id: req.department.id,
      name,
      description,
      banner_image,
      contact_info,
    });
    res.send(department);
  });
