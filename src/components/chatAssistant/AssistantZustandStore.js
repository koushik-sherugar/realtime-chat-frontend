// store.js
import { create } from "zustand";

const useActiveThreadIdStore = create((set) => ({
  activeThreadId: "",
  setActiveThreadId: (id) => set({ activeThreadId: id }),
}));

const useAssistantIdStore = create((set) => ({
  activeAssistantId: "",
  setActiveAssistantId: (id) => set({ activeAssistantId: id }),
}));

const useThreadMsgArr = create((set) => ({
  messageArray: [],
  setMessageArray: (newArray) => set(() => ({ messageArray: newArray })),
}));

const useAssistantDataStore = create((set) => ({
  assistantFilesArray: [],
  setAssistantFilesArray: (newArray) =>
    set(() => ({ assistantFilesArray: newArray })),
}));

export {
  useThreadMsgArr,
  useActiveThreadIdStore,
  useAssistantIdStore,
  useAssistantDataStore,
};
