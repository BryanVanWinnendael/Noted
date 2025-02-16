import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { Box } from "@chakra-ui/react";
import TitleBar from "../TitleBar";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const MarkdownEditor = ({ path }: { path: string }) => {
  const { readFile, saveFile, platform } = useWorkspaceStore();

  const workspace_path = localStorage.getItem("workspace_path");
  const filename =
    platform === "win32"
      ? path.split("\\").pop()?.split(".noted")[0] || "Untitled"
      : path.split("/").pop()?.split(".noted")[0] || "Untitled";
  const homeName =
    platform === "win32"
      ? workspace_path?.split("\\").pop() + ".home"
      : workspace_path?.split("/").pop() + ".home";

  const isHomeFile = filename === homeName;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "markdown-editor prose dark:prose-invert prose-sm sm:prose-base focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      saveFile(content, path);
    },
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await readFile(path);
        if (editor) {
          editor.commands.setContent(content);
        }
      } catch (e) {
        console.error("Error loading file:", e);
      }
    };

    loadContent();
  }, [path, readFile, editor]);

  return (
    <>
      <TitleBar
        editor={editor}
        isHomeFile={isHomeFile}
        filename={filename}
        path={path}
        type="markdown"
      />
      <Box height="100%" overflowY="scroll" p={5}>
        <EditorContent editor={editor} />
      </Box>
    </>
  );
};

export default MarkdownEditor;
