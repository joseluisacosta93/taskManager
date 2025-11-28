"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasksRepository_1 = require("./tasksRepository");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/demo-item", (req, res) => {
    res.json({
        id: 1,
        title: "Demo item",
        description: "",
        completed: false,
    });
});
app.get("/tasks", (req, res) => {
    const tasks = (0, tasksRepository_1.getAllTasks)();
    res.json(tasks);
});
app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = (0, tasksRepository_1.getTaskById)(id);
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.json(task);
});
app.post("/tasks", (req, res) => {
    const { title, description, completed } = req.body;
    if (!title || typeof title !== "string") {
        res.status(400).json({ message: "Title is required" });
        return;
    }
    const task = (0, tasksRepository_1.createTask)(title, description, Boolean(completed));
    res.status(201).json(task);
});
app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;
    const updated = (0, tasksRepository_1.updateTask)(id, { title, description, completed });
    if (!updated) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.json(updated);
});
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const deleted = (0, tasksRepository_1.deleteTask)(id);
    if (!deleted) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.status(204).send();
});
app.post("/tasks/seed", (req, res) => {
    const body = req.body;
    if (!body.tasks || !Array.isArray(body.tasks)) {
        res.status(400).json({ message: "Field 'tasks' must be an array" });
        return;
    }
    const normalized = body.tasks
        .filter((t) => t && typeof t.title === "string")
        .map((t) => ({
        title: t.title,
        description: typeof t.description === "string" ? t.description : undefined,
        completed: typeof t.completed === "boolean" ? t.completed : false,
    }));
    const result = (0, tasksRepository_1.replaceAllTasks)(normalized);
    res.status(201).json(result);
});
app.listen(PORT, () => {
    console.log(`TaskSync backend running on http://localhost:${PORT}`);
});
