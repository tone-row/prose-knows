import { JSONContent } from "@tiptap/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PersistedState = {
  content: JSONContent;
};

export const usePersistedStore = create<PersistedState>()(
  persist(
    (_set) => ({
      content: {},
    }),
    {
      name: "persisted-editor-content",
    }
  )
);
