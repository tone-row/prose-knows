import { LuBold, LuHighlighter, LuItalic } from "react-icons/lu";
import { Toggle } from "../ui/toggle";
import { Editor, useCurrentEditor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Menubar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const activeElement = getActiveElement(editor);

  return (
    <div className="rounded-lg p-1 bg-white/90 backdrop-blur-sm z-10 sticky top-5 flex">
      <Select
        value={activeElement}
        onValueChange={(value) =>
          setActiveElement(editor, value as ReturnType<typeof getActiveElement>)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["p", "h1", "h2", "h3", "h4", "h5", "h6"].map((element) => (
            <SelectItem
              value={element}
              key={element}
              onClick={() =>
                setActiveElement(
                  editor,
                  element as ReturnType<typeof getActiveElement>
                )
              }
            >
              {element}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Toggle
        pressed={editor.isActive("bold") ? true : false}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <LuBold />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic") ? true : false}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <LuItalic />
      </Toggle>
      <Toggle
        pressed={editor.isActive("highlight") ? true : false}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <LuHighlighter />
      </Toggle>
    </div>
  );
}

function setActiveElement(
  editor: Editor,
  element: ReturnType<typeof getActiveElement>
) {
  switch (element) {
    case "h1":
      return editor.chain().focus().setHeading({ level: 1 }).run();
    case "h2":
      return editor.chain().focus().setHeading({ level: 2 }).run();
    case "h3":
      return editor.chain().focus().setHeading({ level: 3 }).run();
    case "h4":
      return editor.chain().focus().setHeading({ level: 4 }).run();
    case "h5":
      return editor.chain().focus().setHeading({ level: 5 }).run();
    case "h6":
      return editor.chain().focus().setHeading({ level: 6 }).run();
    default:
      return editor.chain().focus().setParagraph().run();
  }
}

function getActiveElement(editor: Editor) {
  if (editor.isActive("heading", { level: 1 })) {
    return "h1";
  } else if (editor.isActive("heading", { level: 2 })) {
    return "h2";
  } else if (editor.isActive("heading", { level: 3 })) {
    return "h3";
  } else if (editor.isActive("heading", { level: 4 })) {
    return "h4";
  } else if (editor.isActive("heading", { level: 5 })) {
    return "h5";
  } else if (editor.isActive("heading", { level: 6 })) {
    return "h6";
  }
  return "p";
}
