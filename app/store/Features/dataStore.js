import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTasks :[],
    CompletedTasks : [],
    DeletedTasks :[],
    DeleteClicked : false,
    CompletedClicked : false,  
}

const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        addNewTask : (state, action) => {
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
          toggleDeleteIsClicked: (state) => {
            state.DeleteClicked = !state.DeleteClicked;
          },
          toggleCompletedClicked: (state) => {
            state.CompletedClicked = !state.CompletedClicked;
          },
    }
})

export const {
    allTasks,
    CompletedTasks,
    CompletedClicked,
    DeletedTasks,
    DeletedClicked,
    toggleDeleteIsClicked,
    toggleCompletedClicked,
} = todoSlice.actions;

export default todoSlice.reducer;