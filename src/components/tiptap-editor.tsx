"use client";

import { cn } from "@/lib/utils";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  RiBold,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiItalic,
  RiListOrdered2,
  RiListUnordered,
  RiParagraph,
} from "react-icons/ri";
import { Button } from "./ui/button";

const MenuBar = ({ editor }: { editor: Editor }) => {
  return (
    <div className=" flex w-full flex-wrap gap-2 border-b p-4">
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "outline"}
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiBold />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "outline"}
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiItalic />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        variant={editor.isActive("paragraph") ? "default" : "outline"}
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiParagraph />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "outline"
        }
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiH1 />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "outline"
        }
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiH2 />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
        }
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "outline"
        }
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiH3 />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 4 }).run()
        }
        variant={
          editor.isActive("heading", { level: 4 }) ? "default" : "outline"
        }
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiH4 />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 5 }).run()
        }
        variant={
          editor.isActive("heading", { level: 5 }) ? "default" : "outline"
        }
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiH5 />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 6 }).run()
        }
        variant={
          editor.isActive("heading", { level: 6 }) ? "default" : "outline"
        }
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiH6 />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiListUnordered />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        className={cn("h-8 w-8 rounded-[4px]")}
      >
        <RiListOrdered2 />
      </Button>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

interface TiptapEditorProps {
  setValue: (value: string) => void;
  value?: string;
}

const TiptapEditor = ({ value, setValue }: TiptapEditorProps) => {
  const editor = useEditor({
    content: value,
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose p-2.5 px-4 focus:outline-none min-h-[256px] w-full max-w-full",
      },
    },
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });
  if (!editor) return null;

  return (
    <>
      <div className=" rounded-xl border border-slate-200 shadow-sm">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TiptapEditor;
