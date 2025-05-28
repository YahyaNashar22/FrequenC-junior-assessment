export type TaskStatus = "TO-DO" | "In Progress" | "Done";

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
}
