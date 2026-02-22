import React from "react";
import styles from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ tasks, title, onDelete, onToggle  }) => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: '20px'}}>{title}</h1>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskItem 
          key={task.id} 
          body={task.body} 
          done={task.done}
          onDelete={() => onDelete(task.id)}
          onToggle={() => onToggle(task.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
