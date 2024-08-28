import { create } from "zustand";

export const userTasksRefreshStore = create((set) => ({
  userTasksRefresh: false,
  setUserTasksRefresh: (newState) => {
    set(() => ({ userTasksRefresh: newState }));
  },
}));
