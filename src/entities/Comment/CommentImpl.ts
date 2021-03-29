import { uuidv4 } from "../../utils/uuidv4";
import { IComment } from "./IComment";

export class CommentImpl implements IComment {
  id: string;
  text: string;
  author: string;

  constructor(text: string, author: string) {
    this.id = uuidv4();
    this.text = text;
    this.author = author;
  }
}
