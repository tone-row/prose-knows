import type { EditorProps } from "@tiptap/pm/view";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Link } from "@tiptap/extension-link";
import { usePersistedStore } from "../lib/usePersistedStore";
import { Menubar } from "./Menubar";
import TextStyle from "@tiptap/extension-text-style";

// define your extension array
const extensions = [
  TextStyle,
  StarterKit,
  Markdown.configure({
    linkify: true,
  }),
  Link.configure({
    autolink: true,
  }),
];

const editorProps: EditorProps = {
  attributes: {
    class:
      "main-editor prose prose-neutral lg:prose-lg xl:prose-xl dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none",
    spellcheck: "false",
  },
};

export function TipTap() {
  const content = usePersistedStore((state) => state.content);

  return (
    <EditorProvider
      slotBefore={<Menubar />}
      extensions={extensions}
      editorProps={editorProps}
      content={content}
      onUpdate={({ editor }) => {
        usePersistedStore.setState({
          content: editor.storage.markdown.getMarkdown(),
        });
      }}
    >
      {null}
    </EditorProvider>
  );
}
