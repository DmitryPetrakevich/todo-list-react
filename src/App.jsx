import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import Button from "./components/ui/Button/Button";
import SideBar from "./components/SideBar/SideBar";
import TaskCreator from "./components/TaskCreator/TaskCreator";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, body: "Задача 1", done: false },
    { id: 2, body: "Задача 2", done: false },
    { id: 3, body: "Задача 3", done: false },
    { id: 4, body: "Задача 4", done: false },
    { id: 5, body: "Задача 5", done: false },
    { id: 6, body: "Задача 6", done: false },
  ]);

  const [task, setTask] = useState({ id: "", body: "" });

  const addTask = () => {
    if (task.body.trim() === "") return;

    const newTask = {
      id: Date.now(),
      body: task.body,
    };

    setTasks([...tasks, newTask]);
    setTask({ id: " ", body: " " });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, done: !task.done } 
          : task,
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
          style={{padding: '5px', marginRight: '10px'}}
        />

        <Button onClick={addTask}>Добавить задачу</Button>

        <TaskList 
        onDelete={deleteTask} 
        onToggle={toggleTask}
        tasks={tasks} 
        title={"Список задач"} 
        />

        <TaskCreator />
      </div>
    </div>
  );
}

export default App;
