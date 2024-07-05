import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import editorjsParagraphLinebreakable from "@calumk/editorjs-paragraph-linebreakable";
import Table from "@editorjs/table";
import TextAlign from "@canburaks/text-align-editorjs";
import Marker from "@editorjs/marker";
import editorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import EJLaTeX from "editorjs-latex";
import AudioPlayer from "editorjs-audio-player";
import CodeBox from "@bomdi/codebox";

export const EDITOR_JS_TOOLS = {
  audioPlayer: AudioPlayer,
  Math: {
    class: EJLaTeX,
    shortcut: "CMD+SHIFT+M",
  },
  nestedchecklist: editorjsNestedChecklist,
  Marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
  paragraph: {
    class: editorjsParagraphLinebreakable,
    inlineToolbar: true,
    config: {
      placeholder: "Write your note here...",
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1,
    },
  },
  image: SimpleImage,
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  quote: Quote,
  code: CodeBox,
  delimiter: Delimiter,
  table: Table,
  textAlign: TextAlign,
};
