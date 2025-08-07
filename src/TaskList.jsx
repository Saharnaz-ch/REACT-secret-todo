// import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onTaskClick }) {
  //if no tasks
  if (!tasks.length) return <p>You have no missions yet...</p>;

  //map over the contexted tasks from useTasks()
  //take a single task
  //show that single task as a list element
  return (
    <ul>
      {/* when using {} in map(), you must use return  */}
      {/* otherwise, you can switch to () to implicitly return the JSX */}
      {tasks
        .filter((t) => !t.completed)
        .map((t) => (
          <TaskItem key={t.id} task={t} onClick={() => onTaskClick(t)} />
          //i previously wrote onClick={()=> onTaskClick} which didn't work
          //since i didn't call the function => i passed a props function that returned a function, which ends up doing nothing
        ))}
      {tasks
        .filter((t) => t.completed)
        .map((t) => (
          <TaskItem key={t.id} task={t} onClick={() => onTaskClick(t)} />
        ))}
    </ul>
  );
}

export default TaskList;
