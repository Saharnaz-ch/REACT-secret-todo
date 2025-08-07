import { useEffect, useRef, useState } from "react";
import { useTasks } from "../context/TaskContext";
import AddTodo from "../src/AddTodo";
import TaskList from "../src/TaskList";
import TaskModal from "../src/TaskModal";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { tasks, updateTask } = useTasks();

  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null); //nothing is selected
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleTaskClick(task) {
    setSelected(task); //sets the task into the selectedTask state
  }

  const handleToggleModal = () => setShowModal(!showModal);

  const filteredTask =
    query.length >= 2
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(query.toLocaleLowerCase())
        )
      : tasks;

  const progressingTasks = filteredTask.filter(
    (task) => task.completed === false
  );
  const completedTasks = filteredTask.filter((task) => task.completed === true);

  return (
    <div className="flex h-screen bg-white text-black">
      {/* LEFT (main) */}
      <div className="flex-1 p-10">
        {/* Search */}
        <div className="flex items-center max-w-md mb-10 bg-gray-100 rounded-lg shadow px-4 py-2">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            className="text-gray-400 mr-2"
          >
            <circle cx="8.5" cy="8.5" r="7" />
            <path d="M15 15l-3.5-3.5" />
          </svg>
          <input
            className="bg-transparent outline-none w-full text-gray-800"
            placeholder="search for your tasks..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {/* Header & Add */}
        <div className="flex justify-between mb-8 items-center">
          <h1 className="text-3xl font-semibold">
            You have{" "}
            <span className="text-purple-600 font-bold">
              {/* filter() returns a boolean data and length isn't a function on it, so we need to call it outside filter */}
              {tasks.filter((task) => !task.completed).length}
            </span>{" "}
            Tasks Waiting For You
          </h1>
          <span
            onClick={handleToggleModal}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 font-semibold cursor-pointer"
          >
            +AddNew
          </span>
        </div>
        {/* Modal */}
        {showModal && <AddTodo onClose={handleToggleModal} />}
        {/* Progressing */}
        <section>
          <h2 className="font-bold mb-3">Progressing</h2>
          <ul className="space-y-2">
            <li>
              {progressingTasks.length > 0 ? (
                <TaskList
                  tasks={progressingTasks}
                  onTaskClick={handleTaskClick}
                />
              ) : (
                <p className="text-gray-400">No tasks in progress...</p>
              )}
            </li>
          </ul>
        </section>
        {/* Completed */}
        <section className="mt-8">
          <h2 className="font-bold mb-3">Completed</h2>
          <ul className="space-y-2 text-gray-400">
            {completedTasks.length > 0 ? (
              <TaskList tasks={completedTasks} onTaskClick={handleTaskClick} />
            ) : (
              <p>No completed tasks yet.</p>
            )}
          </ul>
        </section>
      </div>
      {/* RIGHT sidebar */}
      <div className="w-1/3 border-l px-10 py-8 flex flex-col">
        <div className="flex justify-end mb-10 space-x-4 relative">
          {/* Notifications Icon */}
          <span className="relative">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              className="inline"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <span className="absolute -top-1 -right-1 px-1.5 text-xs font-bold text-white bg-orange-500 rounded-full">
              2
            </span>
          </span>
          {/* Profile Menu */}
          <div className="relative" ref={menuRef}>
            <img
              src="https://randomuser.me/api/portraits/lego/1.jpg"
              className="w-9 h-9 rounded-full border-2 border-white shadow-md cursor-pointer"
              alt="avatar"
              onClick={() => setShowMenu((showMenu) => !showMenu)}
            />
            {showMenu && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-3 z-10 min-w-[160px]">
                <p className="font-bold mb-2">Welcome Back!</p>
                <ul className="text-sm space-y-1">
                  <li>
                    <span
                      className="flex w-full text-left hover:text-purple-600 cursor-pointer"
                      onClick={() => navigate("/dashboard")}
                    >
                      <img
                        className="size-3.5 mt-1 mr-1.5"
                        src="../public/img/dashboard.png"
                        alt=""
                      />
                      Dashboard
                    </span>
                  </li>
                  <li>
                    <span
                      className="flex w-full text-left hover:text-purple-600 cursor-pointer"
                      onClick={() => navigate("/favorites")}
                    >
                      <img
                        className="size-3.5 mt-1 mr-1.5"
                        src="../public/img/heart.png"
                        alt=""
                      />
                      Favorites
                    </span>
                  </li>
                  <li>
                    <span
                      className="flex w-full text-left hover:text-purple-600 cursor-pointer"
                      onClick={() => navigate("/addtask")}
                    >
                      <img
                        className="size-3.5 mt-1 mr-1.5"
                        src="../public/img/more.png"
                        alt=""
                      />
                      Add Task
                    </span>
                  </li>
                  <li>
                    <span
                      className="flex w-full text-left hover:text-purple-600 cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/login");
                      }}
                    >
                      <img
                        className="size-3.5 mt-1 mr-1.5"
                        src="../public/img/logout.png"
                        alt=""
                      />
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          {selected ? (
            <TaskModal
              task={selected}
              onClose={() => setSelected(null)}
              onUpdate={updateTask}
            />
          ) : (
            <p className="text-center text-gray-500 mt-24">
              Select a task to see the{" "}
              <span className="text-purple-600">magic...</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
