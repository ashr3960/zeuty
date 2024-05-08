// zeuty-backend/src/routes.ts
import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Task } from "./entities";


const router = express.Router();

// Create a new task
router.post("/tasks", async (req: Request, res: Response) => {
  try {
    const taskRepository = getRepository(Task);
    const newTask = taskRepository.create(req.body);
    await taskRepository.save(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all tasks
router.get("/tasks", async (_req: Request, res: Response) => {
  try {
    const taskRepository = getRepository(Task);
    const tasks = await taskRepository.find(); // Use repository method
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a single task by ID
router.get("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOneOrFail(taskId);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
});

// Update a task
router.put("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const taskRepository = getRepository(Task);
    const updatedTask = await taskRepository.save({
      ...req.body,
      id: req.params.id,
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const taskRepository = getRepository(Task);
    await taskRepository.delete(req.params.id); // Use repository method
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
});

export default router;
