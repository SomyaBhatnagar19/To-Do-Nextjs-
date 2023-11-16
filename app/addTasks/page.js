//app/addTasks/page.js

"use client"

import { title } from "process";
import { useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import { BiArrowToLeft, BiPlus } from "react-icons/bi";
import { toggleEditClickHandler, editTodo, editIsClicked } from "../store/Features/slices/dataStore";
const AddTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);

  const editIsClicked = useSelector((state) => state.todoSlice.editIsClicked);
  const editedList = useSelector((state) => state.todoSlice.editedIncompleteTasks);
    
  let initialValues = { title: "", date: "", description: "" };

  if (editIsClicked && editedList.length > 0) {
    const obj = editedList[0];
    initialValues = { title: obj.title, date: obj.date, description: obj.description };
  }

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (editIsClicked && titleRef.current && dateRef.current && descriptionRef.current) {
      const obj = editedList[0];

      titleRef.current.value = obj.title;
      dateRef.current.value = obj.date;
      descriptionRef.current.value = obj.description;
    }
  }, [editIsClicked, editedList]);
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const clearFormField = () => {
    setValues(initialValues); // Reset the form values
  }

  const addToDoHandler = async (e) => {
    e.preventDefault();
  
    if (editIsClicked) {
      const obj = editedList[0];
      const id = obj._id;
      const editedObj = {
        title: titleRef.current.value,
        date: dateRef.current.value,
        description: descriptionRef.current.value,
      };
  
      try {
        const response = await fetch(`http://localhost:3000/api/${id}`, {
          method: "PUT",
          body: JSON.stringify(editedObj),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to update task");
        }
  
        const data = await response.json();
  
        alert("You have successfully edited your task!");
  clearFormField();
  
        console.log(data);
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    } else {
      const obj = {
        title: titleRef.current.value,
        date: dateRef.current.value,
        description: descriptionRef.current.value,
      };
  
      try {
        const response = await fetch('http://localhost:3000/api', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to add task");
        }
  
        const data = await response.json();
        console.log(data);
  
        alert('You have successfully added your task!');
  
        titleRef.current.value = '';
        dateRef.current.value = '';
        descriptionRef.current.value = '';
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    }
  };
  


  return (
    <div>
      <p
        onClick={openModal}
        className="bg-blue-500 text-white text-sm hover:bg-blue-600"
      >
        Click to add data
      </p>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-700 bg-opacity-10 backdrop-blur-sm">
          <div className="bg-slate-800 rounded p-2 max-w">
            <div className="flex justify-between mb-5">
              <h2 className="text-lg text-white italic">Add New Task</h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-2xl text-xl text-semibold text-white hover:text-gray-800 bg-red-700"
              >
                <BiArrowToLeft/>
              </button>
            </div>
            <hr className="mb-4"/>
      <form className="space-y-4" onSubmit={(e)=>addToDoHandler(e)}>
        <div>
          <label className="text-gray-300 text-md font-sanif">Title:</label>
          <input
            type="text"
            ref={titleRef}
            className="w-full rounded bg-gray-400 text-white-100 focus:outline-none focus:ring focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="text-gray-300 text-md font-sanif">Description:</label>
          <input
            type="text"
            ref={descriptionRef}
            className="w-full rounded bg-gray-400 text-white-100 focus:outline-none focus:ring focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="text-gray-300 text-md font-sanif">Date:</label>
          <input
            type="date"
            ref={dateRef}
            className="w-full rounded bg-gray-400 text-white-100 focus:outline-none focus:ring focus:ring-slate-400"
          />
        </div>

        <button type="submit" className="bg-blue-700 text-white text-sm py-2 px-4 rounded shadow-md hover:bg-blue-600">
          Submit
        </button>
      </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTasks;
