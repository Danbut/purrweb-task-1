export interface Task {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly columnId: string;
  readonly author: string;
}
