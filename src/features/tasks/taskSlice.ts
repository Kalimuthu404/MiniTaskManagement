import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./taskTypes";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";

interface TaskState {
  tasks: Task[];
  editingTask: Task | null;
}

const initialState: TaskState = {
  tasks: loadFromLocalStorage(),
  editingTask: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveToLocalStorage(state.tasks);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
      saveToLocalStorage(state.tasks);
    },
    deleteTask(state, action: PayloadAction<string>) {
      const updated = state.tasks.filter((t) => t.id !== action.payload);
      saveToLocalStorage(updated);
      state.tasks = updated;
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveToLocalStorage(state.tasks);
    },
    setEditingTask(state, action: PayloadAction<Task>) {
      state.editingTask = action.payload;
    },
    clearEditingTask(state) {
      state.editingTask = null;
    },
    reorderTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      saveToLocalStorage(state.tasks);
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleComplete,
  setEditingTask,
  clearEditingTask,
  reorderTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
