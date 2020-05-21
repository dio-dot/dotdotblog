import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(import("../components/editor"), { ssr: false });

const Write = () => {
  const [content, setContent] = useState<string>("");

  const onChangeContent = useCallback(
    (value: string) => {
      setContent(value);
    },
    [content]
  );
  return <Editor content={content} onChangeContent={onChangeContent} />;
};

export default Write;
