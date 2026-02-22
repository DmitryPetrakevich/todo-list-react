import React from "react";
import Button from "../ui/Button/Button";
import styles from "./TaskCreator.module.css"


const TaskCreator = () => {
  return (
    <div className={styles.creator}>
        <Button>+ Новая задача</Button>
    </div>

  );
};

export default TaskCreator;
