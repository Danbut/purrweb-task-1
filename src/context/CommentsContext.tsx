import React, { useMemo, useState } from "react";
import { IComment } from "../entities/Comment/IComment";

const CommentsContext = React.createContext<
  [IComment[], React.Dispatch<React.SetStateAction<IComment[]>>] | []
>([]);

export const useComments = () => {
  const context = React.useContext(CommentsContext);
  if (context === undefined) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};

export const CommentsProvider = (props: any) => {
  const [Comments, setComments] = useState<IComment[]>([]);

  const value = useMemo(() => [Comments, setComments], [Comments]);
  return <CommentsContext.Provider value={value} {...props} />;
};
