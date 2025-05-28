const express = require("express");
const taskController = require("../controllers/taskController");
const taskValidator = require("../validators/taskValidator");

const router = express.Router();

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskValidator, taskController.createTask);
router.put("/:id", taskValidator, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
