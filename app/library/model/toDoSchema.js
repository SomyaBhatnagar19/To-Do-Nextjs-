import mongoose from "mongoose";

const todoModel = new mongoose.Schema({
    title: String,
    date: String,
    description: String,
});

export const todoData = mongoose.models.todoData || mongoose.model("todoData", todoModel);
export const ToDoCompleted = mongoose.models.ToDoCompleted || mongoose.model("ToDoCompleted", todoModel);
export const ToDoImportant = mongoose.models.ToDoImportant || mongoose.model("ToDoImportant", todoModel);