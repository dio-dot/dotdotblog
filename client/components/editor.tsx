import { memo } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageReszie from "quill-image-resize-module";
import highlightJS from "highlight.js";
import fetch from "isomorphic-unfetch";

Quill.register("modules/imageResize", ImageReszie);
highlightJS.configure({
  languages: ["javascript", "python"],
});

function imageUploadHanlder() {
  const input = document.createElement("input");

  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const range = this.quill.getSelection(true);
    // const res = await axios.post('/api/upload/image', formData);
    const res = await fetch("http://localhost:3000/api/upload/image", {
      method: "POST",
      headers: {
        "Content-Length": "1",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
    // const data = await res.json();
    // console.log(data);
    // this.quill.insertEmbed(range.index, "image", `/image/${data}`);
  };
}

const modules = {
  syntax: {
    highlight: (text) => highlightJS.highlightAuto(text).value,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
  },
  toolbar: {
    container: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link", "image", "video", "code-block"],
    ],
    handlers: {
      image: imageUploadHanlder,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "link",
  "image",
  "video",
  "code-block",
];

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
