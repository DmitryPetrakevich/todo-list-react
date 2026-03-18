import { createSlice } from "@reduxjs/toolkit";

const priorityWeight = {
  high: 1,
  medium: 2,
  low: 3,
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const initialState = {
  tasks: [
    {id: 1, body: "Задача 1", done: false, deadline: null, priority: "medium",},
    { id: 2, body: "Задача 2", done: false, deadline: null, priority: "low" },
    { id: 3, body: "Задача 3", done: false, deadline: null, priority: "high" },
  ],
  selectedSort: "",
  filterStatus: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (action.payload.body.trim() === "") return;

      const newTask = {
        id: Date.now(),
        body: action.payload.body,
        done: false,
        deadline: getTodayDate(),
        priority: "medium",
      };

      state.tasks.push(newTask);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.done = !task.done;
      }
    },

    updatePriority: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.taskId);
      if (task) {
        task.priority = action.payload.newPriority;
      }
    },

    updateDeadline: (state, action) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId,
      );
      if (task) {
        task.deadline = action.payload.newDeadline;
      }
    },

    setSort(state, action) {
      state.selectedSort = action.payload;
    },

    clearSort(state, action) {
      state.selectedSort = "";
    },

    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const selectTasks = (state) => state.todo.tasks;
export const selectSelectedSort = (state) => state.todo.selectedSort;
export const selectFilterStatus = (state) => state.todo.filterStatus;

export const selectSortedTasks = (state) => {
  const { tasks, selectedSort } = state.todo;
  
  if (!selectedSort) return tasks;
  
  return [...tasks].sort((a, b) => {
    if (selectedSort === "body") {
      return a.body.localeCompare(b.body);
    }
    if (selectedSort === "deadline") {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    }
    if (selectedSort === "priority") {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    }
    return 0;
  });
};

export const selectFilteredTasks = (state) => {
  const tasks = selectSortedTasks(state);
  const filterStatus = state.todo.filterStatus;
  
  if (filterStatus === 'active') {
    return tasks.filter(task => !task.done);
  }
  if (filterStatus === 'completed') {
    return tasks.filter(task => task.done);
  }
  return tasks; // 'all'
};

export const { 
  addTask, 
  deleteTask, 
  toggleTask, 
  updatePriority, 
  updateDeadline, 
  setSort,
  clearSort,
  setFilterStatus 
} = todoSlice.actions;

export default todoSlice.reducer;