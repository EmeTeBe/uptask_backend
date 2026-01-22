import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router: Router = Router();

// Define your project routes here
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del proyecto es obligatoria"),

  handleInputErrors,
  ProjectController.createProjects,
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),

  handleInputErrors,
  ProjectController.getProjectById,
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del proyecto es obligatoria"),

  handleInputErrors,
  ProjectController.updateProject,
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),

  handleInputErrors,
  ProjectController.deleteProject,
);

// Routes for tasks
router.param("projectId", validateProjectExists);
router.post(
  "/:projectId/task",

  body("taskName")
    .notEmpty()
    .withMessage("El nombre del la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del la tarea es obligatoria"),

  handleInputErrors,
  TaskController.createTask,
);

router.get(
  "/:projectId/task",

  TaskController.getProjectTask,
);

router.get(
  "/:projectId/task/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),

  handleInputErrors,
  TaskController.getTaskById,
);

router.put(
  "/:projectId/task/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("taskName")
    .notEmpty()
    .withMessage("El nombre del la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del la tarea es obligatoria"),

  handleInputErrors,
  TaskController.updateTask,
);

export default router;
