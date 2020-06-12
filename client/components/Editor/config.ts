import { Quill } from "react-quill";
import ImageReszie from "quill-image-resize-module";
import highlightJS from "highlight.js";
import axios from "axios";

Quill.register("modules/imageResize", ImageReszie);

highlightJS.configure({
  languages: ["javascript", "python"],
});

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

const modules = {
  // syntax: {
  // },
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
      highlight: (text) => highlightJS.highlightAuto(text).value,

      image: imageUploadHanlder,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

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
    const res = (await axios.post("/api/upload/image", formData)) as any;
    this.quill.insertEmbed(range.index, "image", `/api/image/${res.data}`);
  };
}

export { formats, modules };
