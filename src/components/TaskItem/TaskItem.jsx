import React from "react";
import styles from "./TaskItem.module.css" 
import Button from "../ui/Button/Button";

const TaskItem = ({body, onDelete}) => {
  return (
    <div className={styles.taskItem}>
      <span>{body}</span>
      <Button
      onClick={onDelete}
      >Удалить</Button>
    </div>
  );
};

export default TaskItem;
