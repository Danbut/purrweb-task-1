import { uuidv4 } from "../../utils/uuidv4";
import { ITask } from "./ITask";
import { IComment } from "../Comment/IComment";

export class TaskImpl implements ITask {
  id: string;
  name: string;
  columnId: string;
  author: string;
  description: string;
  comments: IComment[];

  constructor(name: string, columnId: string, author: string) {
    this.id = uuidv4();
    this.name = name;
    this.columnId = columnId;
    this.author = author;
    this.comments = [];
    this.description = "";
  }
}
