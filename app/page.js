//app/page.js

"use client";

import { BiSearch, BiCircle, BiTrash, BiCheck, BiPlus } from "react-icons/bi";
import AddTasks from "./addTasks/page";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCompletedToDos,
  fetchAllToDos,
} from "./store/Features/slices/dataStore";

import {
  allTasks,
  addNewTask,
  markAsCompleted,
  toggleDeleteIsClicked,
  toggleCompletedClicked,
  CompletedTasks,
  DeletedTasks,
} from "./store/Features/slices/dataStore";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllToDos());
  }, [dispatch]);

  const [AddClicked, setAddClicked] = useState(false);
  const allTasksData = useSelector((state) => state.todoSlice.allTasks);
  const completedTasks = useSelector((state) => state.todoSlice.CompletedTasks);
  const isCompletedClicked = useSelector(
    (state) => state.todoSlice.CompletedClicked
  );

  const addTask = (task) => {
    dispatch(addNewTask(task));
  };

  const markTaskAsCompleted = async (taskID, taskTitle, taskDescription, taskDate) => {
    const obj = {
      title : taskTitle,
      date : taskDate,
      description : taskDescription,
    }
    try {
      const response = await fetch(`http://localhost:3000/api/completedTasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        throw new Error("Failed to mark task as completed");
      }

      alert("This task has been completed.");
      dispatch(markAsCompleted(taskID));
      dispatch(fetchAllCompletedToDos());
    } catch (error) {
      alert("Error!");
      console.error(error);
    }
  };



  const toggleDeleteClick = () => {
    dispatch(toggleDeleteIsClicked());
  };

  const toggleCompletedClick = () => {
    dispatch(toggleCompletedClicked());
  };

  const showCompletedTasks = () => {
    // Dispatch action to set CompletedClicked flag
    dispatch(toggleCompletedClicked());
  };

  const deleteCompletedTask = (taskID) => {
    // Implement logic to delete a completed task
    // Dispatch action to delete the task from the store
  };

  return (
    <div className="bg-zinc-400 min-h-screen">
      <div className="bg-slate-700 p-4 shadow-lg">
        <h1 className="text-xl font-semibold text-white italic">To-Do</h1>
      </div>
      <div className="m-auto mt-9 ml-8 mr-8 bg-slate-700 shadow-lg rounded">
        <div className="bg-slate-800 p-2 rounded flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded bg-gray-400 pl-10 pr-2"
            />
            <BiSearch className="absolute left-3 top-1 text-gray-900" />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setAddClicked(true)}
            >
              {" "}
              <BiPlus />
              {AddClicked && <AddTasks />}
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover-bg-red-600"
              onClick={() => toggleDeleteClick()}
            >
              <BiTrash />
            </button>
          </div>
        </div>
        <div className="p-4">
          {allTasksData.map((task) => (
            <div
              key={task.id}
              className="bg-slate-800 p-3 text-white shadow-md mb-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <BiCircle className="text-purple-500" />
                  <div className="flex flex-col">
                    <div className="text-md font-semibold italic">
                      {task.title}
                    </div>
                    <div className="text-sm text-gray-400 italic">
                      {task.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-gray-300 text-sm text-right italic">
                    {new Date(task.date).toLocaleDateString("en-GB")}
                  </div>
                  <div
                    className="bg-purple-700 text-white text-bold px-4 py-2 rounded-lg hover:bg-purple-500 cursor-pointer"
                    onClick={() => markTaskAsCompleted(task._id, task.title, task.decsription, task.date)}
                  >
                    <BiCheck />
                  </div>
                  <div className="bg-pink-700 text-white text-bold px-4 py-2 rounded-lg hover:bg-pink-500 cursor-pointer">
                    <BiTrash />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={showCompletedTasks}
          >
            Show Completed Tasks
          </button>
        </div>

        {/* Add a section to display completed tasks */}
        {isCompletedClicked && (
  <div className="p-4">
    {completedTasks.map((task) => (
      <div
        key={task.id}
        className="bg-slate-800 p-3 text-white shadow-md mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BiCircle className="text-purple-500" />
            <div className="flex flex-col">
              <div className="text-md font-semibold italic">
                {task.title}
              </div>
              <div className="text-sm text-gray-400 italic">
                {task.description}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-gray-300 text-sm text-right italic">
              {new Date(task.date).toLocaleDateString("en-GB")}
            </div>
            
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
}