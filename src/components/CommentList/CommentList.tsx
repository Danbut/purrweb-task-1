import React, { useEffect } from "react";
import { useComments } from "../../context/CommentsContext";
import store from "../../utils/store";
import Comment from "../Comment";

interface CommentsListProps {
  readonly taskId: string;
  readonly columnId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ taskId, columnId }) => {
  const [comments, setComments] = useComments();

  useEffect(() => {
    const comments = store.getComments(taskId, columnId);
    if (comments && setComments) {
      setComments(comments);
    }
  }, []);

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
