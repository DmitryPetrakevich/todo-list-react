import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import Button from "./components/ui/Button/Button";
import SideBar from "./components/SideBar/SideBar";
import TaskCreator from "./components/TaskCreator/TaskCreator";
import MySelect from "./components/Sorter/MySelect";
import MyInput from "./components/ui/Input/MyInput";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, body: "Задача 1", done: false, deadline: null, priority: "medium" },
    { id: 2, body: "Задача 2", done: false, deadline: null, priority: "low" },
    { id: 3, body: "Задача 3", done: false, deadline: null, priority: "high" },
    { id: 4, body: "Задача 4", done: false, deadline: null, priority: "medium" },
    { id: 5, body: "Задача 5", done: false, deadline: null, priority: "medium" },
    { id: 6, body: "Задача 6", done: false, deadline: null, priority: "medium" },
  ]);

  const [task, setTask] = useState({ id: "", body: "" });
  const [selectedSort, setSelectedSort] = useState('')

  const priorityWeight = {
    high: 1,
    medium: 2,
    low: 3
  }

  

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
      priority: "medium"
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

  const updatePriority = (taskId, newPriority) => {
    setTasks(
      tasks.map((task) => 
        task.id === taskId ? {...task, priority: newPriority} : task
      )
    );
  };

  const updateDeadLine = (taskId, newDeadline) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, deadline: newDeadline } : task,
      ),
    );
  };

  const sortedTasks = (tasks, sort) => {
  if (!sort) return tasks;  
  
  return [...tasks].sort((a, b) => {
    if (sort === "body") {
      return a.body.localeCompare(b.body);  
    }
    if (sort === "deadline") {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    }
    if (sort === "priority") {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    }
    return 0;
  });
};

const visibleTasks = sortedTasks(tasks, selectedSort);

  return (
    <div className="app">
      <SideBar />

      <div className="main">
        <MyInput
          value={task.body}
          onChange={(e) => setTask({ ...task, body: e.target.value })}
          placeholder="Название задачи..."
          style={{marginRight: "10px" }}
        />

        <Button onClick={addTask}>Добавить задачу</Button>

        <MySelect 
        value={selectedSort}
        onChange={e => setSelectedSort(e.target.value)}
        defaultValue={"Сортировка по"} 
        options={[
          { value: "body", name: "По названию" },
          { value: "deadline", name: "По времени" },
          { value: "priority", name: "По приоритету" },
        ]}
        />

        <TaskList
          onDelete={deleteTask}
          onToggle={toggleTask}
          onDeadlineChange={updateDeadLine}
          onPriorityChange={updatePriority}
          tasks={visibleTasks}
          title={"Список задач"}
        />

        <TaskCreator />
      </div>
    </div>
  );
}

export default App;
