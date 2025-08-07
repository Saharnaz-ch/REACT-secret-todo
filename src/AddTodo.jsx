import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function AddTodo({ onClose }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Normal");
  const [dueDate, setDueDate] = useState("");

  //the handleAdd CREATES task from user inputs
  //unlike addTask in TaskContext which is CALLED to update the task list
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      favorite: false,
      title,
      desc,
      status,
      dueDate,
    };

    addTask(newTask);
    setTitle("");
    setDesc("");
    setStatus("Normal");
    setDueDate("");
    onClose(); //close modal after adding
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end ">
      <div className="relative w-full sm:max-w-sm bg-white shadow-2xl rounded-xl p-8 mt-16 mr-10 animate-slideInRight">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <form onSubmit={handleAdd} className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold mb-2">Add a New Task</h2>
          <input
            type="text"
            placeholder="Task Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="select"> -- select -- </option>
              <option value="Minor">Minor</option>
              <option value="Normal">Normal</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="duedate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-purple-600 text-[#8C4CC5] text-base font-semibold py-2 rounded-md shadow hover:bg-purple-700 transition justify-center p-[35%]"
          >
            +Add New
          </button>
        </form>
      </div>
    </div>
  );
}
