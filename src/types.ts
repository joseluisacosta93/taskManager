export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  latitude?: number;
  longitude?: number;
}
