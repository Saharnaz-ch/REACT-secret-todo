import { useState } from "react";

export default function TaskModal({ task, onClose, onUpdate }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...task });
  // OR const [formDate, setFormData] = useState({
  //   title: task.title,
  //   desc: task.desc,
  //   status: task.status,
  //   duedate: task.duedate
  // })

  function handleEditClick() {
    setIsEditMode(!isEditMode);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(formData);
    setIsEditMode(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl p-8 mt-16 mr-10 animate-slideInRight">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black"
          aria-label="Close"
        >
          ×
        </button>

        {!isEditMode ? (
          // View Mode
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold mb-4">{task.title}</h2>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Description
              </label>
              <p className="text-base text-gray-800">{task.desc}</p>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Priority
                </label>
                <span
                  className={
                    "text-sm font-semibold " +
                    (task.status === "Normal"
                      ? "text-green-500"
                      : task.status === "Minor"
                      ? "text-yellow-500"
                      : "text-red-500")
                  }
                >
                  {task.status}
                </span>
              </div>
              {task.dueDate && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Due Date
                  </label>
                  <span className="text-sm text-gray-800">{task.dueDate}</span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleEditClick}
              className="w-full mt-2 py-2 bg-purple-600 hover:bg-purple-700 text-[#ffffff] font-semibold rounded-md shadow transition"
            >
              Edit
            </button>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Update Your Task</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              autoFocus
              placeholder="Task Name"
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <textarea
              name="desc"
              value={formData.desc}
              placeholder="Description"
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none min-h-[80px]"
            />
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Priority
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="Minor">Minor</option>
                <option value="Normal">Normal</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-[#ffffff] font-semibold rounded-md shadow transition"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
