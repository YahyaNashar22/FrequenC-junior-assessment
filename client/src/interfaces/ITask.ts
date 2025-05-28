export type TaskStatus = "To-Do" | "In Progress" | "Done";

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string;
}
