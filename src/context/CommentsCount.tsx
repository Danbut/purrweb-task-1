import React, { useMemo, useState } from "react";

const CommentsCountContext = React.createContext<
  [number, React.Dispatch<React.SetStateAction<number>>] | []
>([]);

export const useCommentsCount = () => {
  const context = React.useContext(CommentsCountContext);
  if (context === undefined) {
    throw new Error(
      "useCommentsCount must be used within a CommentsCountProvider"
    );
  }
  return context;
};

export const CommentsCountProvider = (props: any) => {
  const [CommentsCount, setCommentsCount] = useState<number>(0);

  const value = useMemo(() => [CommentsCount, setCommentsCount], [
    CommentsCount,
  ]);
  return <CommentsCountContext.Provider value={value} {...props} />;
};
