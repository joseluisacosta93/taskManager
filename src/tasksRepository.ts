import { Task } from "./types";

let tasks: Task[] = [{ id: 1, title: "Demo item", completed: false }];

let nextId = 2;

export type NewTaskInput = {
  title: string;
  description?: string;
  completed?: boolean;
};

export function getAllTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(
  title: string,
  description: string,
  completed: boolean = false
): Task {
  const task: Task = { id: nextId++, title, description, completed };
  tasks.push(task);
  return task;
}

export function updateTask(
  id: number,
  data: Partial<Omit<Task, "id">>
): Task | undefined {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return undefined;

  const updated: Task = { ...tasks[index], ...data };
  tasks[index] = updated;
  return updated;
}

export function deleteTask(id: number): boolean {
  const originalLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < originalLength;
}

export function replaceAllTasks(newTasks: NewTaskInput[]): Task[] {
  tasks = newTasks.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    completed: item.completed ?? false,
  }));
  nextId = tasks.length + 1;
  return tasks;
}
