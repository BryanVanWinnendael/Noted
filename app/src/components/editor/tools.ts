import Header from "@editorjs/header"
import SimpleImage from "@editorjs/simple-image"
import Checklist from "@editorjs/checklist"
import List from "@editorjs/list"
import Quote from "@editorjs/quote"
import Paragraph from "@editorjs/paragraph"

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
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
}
