export interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
}

export interface TaskFilterType {
  status: "all" | "todo" | "in-progress" | "done";
}
