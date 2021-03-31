import React from "react";
import { selectComments } from "../../state/comments/commentsSlice";
import { useAppSelector } from "../../state/hooks";
import { Comment } from "../Comment";

interface CommentsListProps {
  readonly taskId: string;
  readonly columnId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ taskId, columnId }) => {
  const comments = useAppSelector(selectComments).get(taskId)?.comments;

  return (
    <>
      {comments?.map((c) => (
        <Comment
          key={`id:${c.id}`}
          comment={c}
          taskId={taskId}
          columnId={columnId}
        />
      ))}
    </>
  );
};

export default CommentsList;
