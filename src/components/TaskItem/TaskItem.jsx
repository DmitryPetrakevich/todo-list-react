import React from "react";
import styles from "./TaskItem.module.css" 
import Button from "../ui/Button/Button";

const TaskItem = ({body, done, onDelete, onToggle}) => {
  
  return (
    <div className={styles.taskItem}>
      <div className={styles['task-left']}>
        <input 
        className={styles.checkbox} 
        type="checkbox" 
        checked={done}
        onChange={onToggle}  
        />
        <span className={done ? styles.done : ''}>
          {body}
        </span>
      </div>

      <Button
      onClick={onDelete}
      >Удалить</Button>
    </div>
  );
};

export default TaskItem;
