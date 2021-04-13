export interface ITEM {
  id: number;
  title: string;
  status: "active" | "clear";
}

export interface STATE {
  todoList: ITEM[];
}
