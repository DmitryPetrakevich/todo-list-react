import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import Button from "./components/ui/Button/Button";
import SideBar from "./components/SideBar/SideBar";
import TaskCreator from "./components/TaskCreator/TaskCreator";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, body: "Задача 1", done: false, deadline: null },
    { id: 2, body: "Задача 2", done: false, deadline: null },
    { id: 3, body: "Задача 3", done: false, deadline: null },
    { id: 4, body: "Задача 4", done: false, deadline: null },
    { id: 5, body: "Задача 5", done: false, deadline: null },
    { id: 6, body: "Задача 6", done: false, deadline: null },
  ]);

  const [task, setTask] = useState({ id: "", body: "" });

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addTask = () => {
    if (task.body.trim() === "") return;

    const newTask = {
      id: Date.now(),
      body: task.body,
      done: false,
      deadline: getTodayDate(),
    };

    setTasks([...tasks, newTask]);
    setTask({ id: "", body: "" });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const updateDeadLine = (taskId, newDeadline) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, deadline: newDeadline } : task,
      ),
    );
  };

  return (
    <div className="app">
      <SideBar />

      <div className="main">
        <input
          value={task.body}
          onChange={(e) => setTask({ ...task, body: e.target.value })}
          placeholder="Название задачи..."
          style={{ padding: "5px", marginRight: "10px" }}
        />

        <Button onClick={addTask}>Добавить задачу</Button>

        <TaskList
          onDelete={deleteTask}
          onToggle={toggleTask}
          onDeadlineChange={updateDeadLine}
          tasks={tasks}
          title={"Список задач"}
        />

        <TaskCreator />
      </div>
    </div>
  );
}

export default App;
