import React from "react";
import Button from "../ui/Button/Button";
import styles from "./TaskCreator.module.css"
import { useDispatch, useSelector } from "react-redux";

import {
  toggleModal,
} from "../../store/slices/todoSlice"


const TaskCreator = () => {
  const dispatch  =useDispatch()
  

  const handleToggleModal = () => {
    dispatch(toggleModal())
  }

  return (
    <div className={styles.creator}>
        <Button onClick={handleToggleModal}>+ Новая задача</Button>
    </div>

  );
};

export default TaskCreator;
