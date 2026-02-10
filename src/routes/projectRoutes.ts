import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";
import { taskBelongsToProject, validateTaskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";

const router: Router = Router();

router.use(authenticate);

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

router.param("taskId", validateTaskExists);
router.param("taskId", taskBelongsToProject);
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

router.delete(
  "/:projectId/task/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),

  handleInputErrors,
  TaskController.deleteTask,
);

router.post(
  "/:projectId/task/:taskId/status",
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),

  handleInputErrors,
  TaskController.UpdateStatusTask,
);

// Routes for teams
router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("E-mail no válido"),

  handleInputErrors,
  TeamMemberController.findMemberByEmail,
);

router.get(
  "/:projectId/team",

  TeamMemberController.getProjectTeam,
);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("Id no válido"),

  handleInputErrors,
  TeamMemberController.addMemberById,
);

router.delete(
  "/:projectId/team",
  body("id").isMongoId().withMessage("Id no válido"),

  handleInputErrors,
  TeamMemberController.removeMemberById,
);

export default router;
