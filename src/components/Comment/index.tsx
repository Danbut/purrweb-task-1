import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import "./index.css";

interface CommentProps {
  author: string;
}

const Comment: React.FC<CommentProps> = ({ author, children }) => {
  return (
    <BootstrapCard className="card" bg="light" as={"p"}>
      <BootstrapCard.Title className="card__title h6">
        {author}
      </BootstrapCard.Title>
      <BootstrapCard.Body>{children}</BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Comment;
