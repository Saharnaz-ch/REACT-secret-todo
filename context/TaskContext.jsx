//since we need the task operations to be running globally (add, delete, edit)
//we need React Context API to handle all task operations

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  //useRef() => it remembers something without causing re-renders like useState() would
  //just like a sticky note!!!
  //Hey React, i want to remember a little flag- just a simple note to myself - and this flag says true the first time i show up on the screen

  const isFirstRender = useRef(true);

  //That first render happens very fast, often before your state (like tasks) is updated from localStorage.
  //------------------------------------------------------
  //If we don't skip it, the useEffect runs and overwrites the just-loaded tasks with an empty list ([]), because React first initializes tasks with an empty array.
  //------------------------------------------------------
  //now, we can use localStorage to persist the task on showing even after refresh
  //we need to read tasks from localStorage when the app starts (useEffect)

  //1.load tasks from localStorage on first load
  useEffect(() => {
    try {
      const tasksFromStorage = localStorage.getItem("tasks");
      if (tasksFromStorage) {
        setTasks(JSON.parse(tasksFromStorage));
      }
    } catch (e) {
      console.error("Failed to parse tasks from localStorage:", e);
    }
  }, []);

  //then, whenever tasks change, we need to write those in localStorae
  //2.save tasks to localStorage whenever they change

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //💡This function ADDS a task to the previous list
  //and it expects a task OBJECT to be passed in -> but it's NOT CREATING the task
  //it's just FINALIZING with a uuid and completed:false
  const addTask = (task) => {
    //uuidv4() generate a unique id for every task
    setTasks([
      ...tasks,
      { ...task, id: uuidv4(), completed: false, favorite: false },
    ]);
  };

  //set tasks can be updated using Functional Update
  //so the below function says [update the task array, and create a new array based on the previous one (prev)]
  const toggleFavorite = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        //...task => keep all task properties, but favorite
        task.id === id ? { ...task, favorite: !task.favorite } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //t => each individual task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <TaskContext.Provider
        value={{
          tasks,
          addTask,
          toggleFavorite,
          deleteTask,
          updateTask,
          toggleComplete,
        }}
      >
        {children}
      </TaskContext.Provider>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
  return useContext(TaskContext);
}
