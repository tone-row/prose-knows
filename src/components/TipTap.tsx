import type { EditorProps } from "@tiptap/pm/view";
import { EditorProvider, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Link } from "@tiptap/extension-link";
import { usePersistedStore } from "../lib/usePersistedStore";
import { Menubar } from "./Menubar";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { useCallback, useEffect } from "react";
import { annotate } from "../lib/rough-notation";

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
  Highlight.configure({
    HTMLAttributes: {
      class: "highlight-class",
    },
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
  const onUpdate = useCallback<NonNullable<EditorProviderProps["onUpdate"]>>(
    ({ editor, transaction }) => {
      usePersistedStore.setState({
        content: editor.storage.markdown.getMarkdown(),
      });

      // Check if a new highlight is added
      if (transaction) {
        for (const step of transaction.steps) {
          const stepJSON = step.toJSON();
          if (
            stepJSON?.stepType === "addMark" &&
            stepJSON?.mark?.type === "highlight"
          ) {
            console.log("HIGHLIGHT ADDED!");
            const el = document.querySelector(
              ".highlight-class"
            ) as HTMLElement;
            if (!el) return;
            console.log(el);
            annotate(el, {
              type: "highlight",
            }).show();
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    setTimeout(() => {
      const els = document.querySelectorAll("mark");
      console.log(els.length);
      els.forEach((el) => {
        const annotation = annotate(el as HTMLElement, {
          type: "highlight",
          color: "yellow",
          iterations: 1,
          multiline: true,
        });
        annotation.show();
      });
    }, 100);
  }, []);

  return (
    <EditorProvider
      slotBefore={<Menubar />}
      extensions={extensions}
      editorProps={editorProps}
      content={content}
      onUpdate={onUpdate}
    >
      {null}
    </EditorProvider>
  );
}
