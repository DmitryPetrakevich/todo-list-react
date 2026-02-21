import React from "react";
import styles from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ tasks, title, onDelete }) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskItem 
          key={task.id} 
          body={task.body} 
          onDelete={() => onDelete(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
