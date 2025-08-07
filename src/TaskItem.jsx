import {
  MdDragIndicator,
  MdOutlineRestoreFromTrash,
  MdStar,
} from "react-icons/md";
import { useTasks } from "../context/TaskContext";
export default function TaskItem({ task, onClick }) {
  const { toggleComplete, toggleFavorite, deleteTask } = useTasks();

  // Status color classes
  const statusColor =
    task.status === "Normal"
      ? "text-green-500"
      : task.status === "Minor"
      ? "text-yellow-500"
      : "text-red-500";
  return (
    <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded group cursor-pointer">
      <span className="flex items-center space-x-2">
        <span className="text-gray-400">⋮⋮</span>

        {/* we write arrow functions to delay until the click happens  */}
        {/* if we write onClick={tasks.toggleFavorite(task.id)} it won't wait for the click to happen, it renders immediately */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(task.id);
          }}
          className={task.favorite ? "text-yellow-400" : "text-gray-300"}
          style={{ cursor: "pointer" }}
        >
          ★
        </span>

        <span onClick={onClick} className="hover:underline">
          {task.title}
        </span>
      </span>
      {/* STATUS, checkbox, delete */}
      <span className="flex items-center space-x-3">
        <span className={`text-xs ${statusColor}`}>{task.status}</span>
        {/* Right side, complete and delete  */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="accent-purple-600 border border-gray-300 rounded w-4 h-4"
        />
        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          className="text-red-400 hover:text-red-600"
        >
          <MdOutlineRestoreFromTrash size={18} />
        </button>
      </span>
    </li>
  );
}
