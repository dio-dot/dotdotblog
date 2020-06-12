import { memo } from "react";
import ReactQuill from "react-quill";
import { formats, modules } from "./config";

interface EditorProps {
  content: string;
  onChangeContent: (value: string) => void;
}

const Editor: React.FC<EditorProps> = memo(({ content, onChangeContent }) => {
  return (
    <ReactQuill
      onChange={onChangeContent}
      value={content}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
});

export default Editor;
