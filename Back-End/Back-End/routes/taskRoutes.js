import express from "express";
import { body } from "express-validator";
import protect from "../middleware/protect.js";
import handleValidation from "../middleware/handleValidation.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect);

router.get("/", getTasks);

router.post(
  "/",
  [body("title").trim().notEmpty().withMessage("Title is required")],
  handleValidation,
  createTask
);

router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;