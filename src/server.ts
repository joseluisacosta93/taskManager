import express, { Request, Response } from "express";
import cors from "cors";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  replaceAllTasks,
  NewTaskInput,
} from "./tasksRepository";

import {  generateToken, validateUser } from "./auth";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/demo-item", (req: Request, res: Response) => {
  res.json({
    id: 1,
    title: "Demo item",
    description: "",
    completed: false,
  });
});

app.get("/tasks", (req: Request, res: Response) => {
  const tasks = getAllTasks();
  res.json(tasks);
});

app.get("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = getTaskById(id);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.json(task);
});

app.post("/tasks", (req: Request, res: Response) => {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== "string") {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const task = createTask(title, description, Boolean(completed));
  res.status(201).json(task);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  const updated = updateTask(id, { title, description, completed });

  if (!updated) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.json(updated);
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = deleteTask(id);

  if (!deleted) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(204).send();
});

app.post("/tasks/seed", (req: Request, res: Response) => {
  const tasksInput = req.body as NewTaskInput[];

  if (!Array.isArray(tasksInput)) {
    return res.status(400).json({
      message: "Body must be an array of tasks",
    });
  }

  const normalized: NewTaskInput[] = tasksInput
    .filter((t) => t && typeof t.title === "string")
    .map((t) => ({
      title: t.title,
      description:
        typeof t.description === "string" ? t.description : undefined,
      completed: typeof t.completed === "boolean" ? t.completed : false,
    }));

  const result = replaceAllTasks(normalized);
  return res.status(201).json(result);
});

app.post("/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = validateUser(email, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);
  return res.json({ token });
});

app.listen(PORT, () => {
  console.log(`TaskSync backend running on http://localhost:${PORT}`);
});
