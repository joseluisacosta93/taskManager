"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = getAllTasks;
exports.getTaskById = getTaskById;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.replaceAllTasks = replaceAllTasks;
let tasks = [{ id: 1, title: "Demo item", completed: false }];
let nextId = 2;
function getAllTasks() {
    return tasks;
}
function getTaskById(id) {
    return tasks.find((t) => t.id === id);
}
function createTask(title, description, completed = false) {
    const task = { id: nextId++, title, description, completed };
    tasks.push(task);
    return task;
}
function updateTask(id, data) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1)
        return undefined;
    const updated = { ...tasks[index], ...data };
    tasks[index] = updated;
    return updated;
}
function deleteTask(id) {
    const originalLength = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    return tasks.length < originalLength;
}
function replaceAllTasks(newTasks) {
    tasks = newTasks.map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: item.description,
        completed: item.completed ?? false,
    }));
    nextId = tasks.length + 1;
    return tasks;
}
