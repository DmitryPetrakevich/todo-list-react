import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import Button from "./components/ui/Button/Button";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, body: "Задача 1" },
    { id: 2, body: "Задача 2" },
    { id: 3, body: "Задача 3" },
    { id: 4, body: "Задача 4" },
    { id: 5, body: "Задача 5" },
    { id: 6, body: "Задача 6" },
  ]);

  const [task, setTask] = useState({ id: "", body: "" });

  const addTask = () => {
    if(task.body.trim() === "") return

    const newTask = {
      id: Date.now(),
      body: task.body,
    };

    setTasks([...tasks, newTask]);
    setTask({ id: " ", body: " " });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  return (
    <div>
      <input
        value={task.body}
        onChange={(e) => setTask({ ...task, body: e.target.value })}
        placeholder="Название задачи..."
      />

      <Button 
      onClick={addTask}
      >
        Добавить задачу
      </Button>

      <TaskList 
      onDelete={deleteTask}
      tasks={tasks} 
      title={"Список задач"}
      />
    </div>
  );
}

export default App;
