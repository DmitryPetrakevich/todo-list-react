import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import TaskList from "./components/TaskList/TaskList";
import Button from "./components/ui/Button/Button";
import SideBar from "./components/SideBar/SideBar";
import TaskCreator from "./components/TaskCreator/TaskCreator";
import MySelect from "./components/Sorter/MySelect";
import MyInput from "./components/ui/Input/MyInput";

import { 
  addTask, 
  setSort,
  selectFilteredTasks, 
  selectSelectedSort
} from "./store/slices/todoSlice";

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector(selectFilteredTasks);
  const selectedSort = useSelector(selectSelectedSort);

  const [taskBody, setTaskBody] = useState('')

  const handleAddTask = () => {
    if(taskBody.trim() === "") return;

    dispatch(addTask({body: taskBody}))
    setTaskBody("")
  }

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value))

  }

  return (
    <div className="app">
      <SideBar />

      <div className="main">
        <MyInput
          value={taskBody}
          onChange={(e) => setTaskBody(e.target.value)}
          placeholder="Название задачи..."
          style={{marginRight: "10px" }}
        />

        <Button onClick={handleAddTask}>Добавить задачу</Button>

        <MySelect 
        value={selectedSort}
        onChange={handleSortChange}
        defaultValue={"Сортировка по"} 
        options={[
          { value: "body", name: "По названию" },
          { value: "deadline", name: "По времени" },
          { value: "priority", name: "По приоритету" },
        ]}
        />

        <TaskList
        tasks={tasks}
        title={"Список задач"}
        />

        <TaskCreator />
      </div>
    </div>
  );
}

export default App;
