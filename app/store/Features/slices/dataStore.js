//app/store/slices/dataStore.js
"use client";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
  CompletedTasks: [],
  DeletedTasks: [],
  editedIncompleteTasks : [],
  DeleteClicked: false,
  editIsClicked: false,
  CompletedClicked: false,
  modalIsClicked: false,
  toggleModalIsClicked: false,
};

export const fetchAllToDos = createAsyncThunk(
  "ToDo/fetchAllToDos",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api");
      if (!response.ok) {
        throw new Error("Failed to get Toos.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllCompletedToDos = createAsyncThunk(
  "ToDo/fetchAllCompletedToDos",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/completedTasks");
      if (!response.ok) {
        throw new Error("Failed to get Toos.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      state.allTasks = action.payload;
    },
    markAsCompleted: (state, action) => {
      const taskId = action.payload;
      const taskIndex = state.allTasks.findIndex((item) => item.id === taskId);
      if (taskIndex !== -1) {
        const completedTask = state.allTasks[taskIndex];
        state.CompletedTasks.push(completedTask);
      }
    },
    editTodo: (state, action) => {
      state.editedIncompleteTasks.push(action.payload);
    },
    toggleModalIsClicked: (state) => {
      state.modalIsClicked = !state.modalIsClicked;
    },
    toggleDeleteIsClicked: (state) => {
      state.DeleteClicked = !state.DeleteClicked;
    },
    toggleCompletedClicked: (state) => {
      state.CompletedClicked = !state.CompletedClicked;
    },
    toggleEditClickHandler: (state) => {
      state.editIsClicked = !state.editIsClicked;
  },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllToDos.fulfilled, (state, action) => {
      state.allTasks = action.payload;
    });
    builder.addCase(fetchAllCompletedToDos.fulfilled, (state, action) => {
      state.CompletedTasks = action.payload;
    });
  },
});

export const {
  allTasks,
  CompletedTasks,
  CompletedClicked,
  DeletedTasks,
  DeletedClicked,
  toggleDeleteIsClicked,
  toggleCompletedClicked,
  markAsCompleted,
  addNewTask,
  editTodo,
  toggleEditClickHandler,
  editedIncompleteTasks,
  editIsClicked,
  modalIsClicked,
  toggleModalIsClicked,
} = todoSlice.actions;

export default todoSlice.reducer;
