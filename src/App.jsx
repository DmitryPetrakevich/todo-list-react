import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import TaskList from "./components/TaskList/TaskList";
import Button from "./components/ui/Button/Button";
import SideBar from "./components/SideBar/SideBar";
import TaskCreator from "./components/TaskCreator/TaskCreator";
import MySelect from "./components/Sorter/MySelect";

import { 
  addTask, 
  setSort,
  selectFilteredTasks, 
  selectSelectedSort,
  selectShowModal,
  selectTaskBody,
  toggleModal,
  
} from "./store/slices/todoSlice";
import CreateTaskModal from "./components/CreateTaskModal/CreateTaskModal";

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector(selectFilteredTasks);
  const selectedSort = useSelector(selectSelectedSort);
  const showModal = useSelector(selectShowModal);
  const taskBody = useSelector(selectTaskBody)

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value))
  }

  return (
    <div className="app">
      <SideBar />

      <div className="main">
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
        {showModal ? <CreateTaskModal/> : null}
        
      </div>
    </div>
  );
}

export default App;
