export interface TODO {
  readonly id: number;
  readonly title: string;
  readonly status: "active" | "clear";
}
