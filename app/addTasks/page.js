//app/addTasks/page.js

"use client"

import React, { useState } from "react";
import { BiArrowToLeft, BiPlus } from "react-icons/bi";
const AddTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Click to add data
      </button>

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
            <form className="space-y-4">
        <div>
          <label className="text-gray-300 text-md font-sanif">Title:</label>
          <input
            type="text"
            className="w-full rounded bg-gray-400 text-white-100 focus:outline-none focus:ring focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="text-gray-300 text-md font-sanif">Description:</label>
          <input
            type="text"
            className="w-full rounded bg-gray-400 text-white-100 focus:outline-none focus:ring focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="text-gray-300 text-md font-sanif">Date:</label>
          <input
            type="date"
            className="w-full rounded bg-gray-400 text-white-100 focus:outline-none focus:ring focus:ring-slate-400"
          />
        </div>

        <button className="bg-blue-700 text-white text-sm py-2 px-4 rounded shadow-md hover:bg-blue-600">
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
