import { Task } from "./types";

export type NewTaskInput = {
  title: string;
  description?: string;
  completed?: boolean;
  latitude?: number;
  longitude?: number;
};

let tasks: Task[] = [
  {
    id: 1,
    title: "Demo item",
    description: "Example task",
    completed: false,
    latitude: 0,
    longitude: 0,
  },
];

let nextId = 2;

export function getAllTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: number): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function createTask(
  title: string,
  description: string | undefined,
  completed: boolean = false,
  latitude?: number,
  longitude?: number
): Task {
  const task: Task = {
    id: nextId++,
    title,
    description,
    completed,
    latitude,
    longitude,
  };
  tasks.push(task);
  return task;
}

export function updateTask(
  id: number,
  data: Partial<Omit<Task, "id">>
): Task | undefined {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return undefined;
  }
  const updated: Task = { ...tasks[index], ...data };
  tasks[index] = updated;
  return updated;
}

export function deleteTask(id: number): boolean {
  const originalLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length < originalLength;
}

export function replaceAllTasks(newTasks: NewTaskInput[]): Task[] {
  tasks = newTasks.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    completed: item.completed ?? false,
    latitude: item.latitude,
    longitude: item.longitude,
  }));
  nextId = tasks.length + 1;
  return tasks;
}
