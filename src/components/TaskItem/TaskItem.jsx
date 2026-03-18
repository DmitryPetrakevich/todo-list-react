import styles from "./TaskItem.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import Button from "../ui/Button/Button";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";

import { 
  deleteTask, 
  toggleTask, 
  updateDeadline, 
  updatePriority,
  updateActiveColor,
  selectActiveColor,
} from "../../store/slices/todoSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch()

  const activeTaskId = useSelector(selectActiveColor)

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPriorityPickerOpen, setIsPriorityPickerOpen] = useState(false)
  
  const deadlineDate = task.deadline ? new Date(task.deadline) : new Date();

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  const handleDateChange = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    dispatch(updateDeadline({taskId: task.id, newDeadline: formattedDate}))

    setIsDatePickerOpen(false);
  };

  const handlePriorityChange = (selectedPriority) => {
    dispatch(updatePriority({taskId: task.id, newPriority: selectedPriority}))
    setIsPriorityPickerOpen(false);
  }

  const handleActiveTask = () => {
    dispatch(updateActiveColor(task.id))
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  const handleToggle = () => {
    dispatch(toggleTask(task.id))
  }

  return (
    <div className={[
      styles.taskItem,
      task.priority === "high" && styles.high,
      task.priority === 'medium' && styles.medium,
      task.priority === 'low' && styles.low,
      activeTaskId === task.id && styles.active
    ].filter(Boolean).join(" ")
    }
    onClick={() => handleActiveTask()}
    >
      <div className={styles["task-left"]}>
        <input
          className={[styles['checkbox'], styles[`checkbox-${task.priority}`]].join(" ")}
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
        />

        <div className={styles.taskContent}>
          <span className={task.done ? styles.done : ""}>{task.body}</span>

          <button
            className={styles.deadlineButton}
            onClick={(e) => {
              e.stopPropagation()
              setIsDatePickerOpen(true)}
            }
          >
            {formatDate(task.deadline)}
          </button>

          {isDatePickerOpen && (
            <div className={styles.datePickerPopup}>
              <DatePicker
                selected={deadlineDate}
                onChange={handleDateChange}
                inline // показывает календарь всегда (не выпадающий)
                locale={ru}
                dateFormat="dd/MM/yyyy"
                onClickOutside={() => setIsDatePickerOpen(false)} 
              />
            </div>
          )}
        </div>
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: '10px', position: 'relative'}}>
        <div 
        className={[styles['priority-indicator'], styles[`priority-${task.priority}`]].join(" ")} 
        onClick={() => setIsPriorityPickerOpen(true)}
        />

        {isPriorityPickerOpen && (
          <div className={styles['priority-wrapper']}> 
              <span 
              className={[styles['priority-choice'], styles['priority-low']].join(" ")} 
              onClick={() => handlePriorityChange('low')}
              />

              <span 
              className={[styles['priority-choice'], styles['priority-medium']].join(" ")} 
              onClick={() => handlePriorityChange('medium')}
              />

              <span 
              className={[styles['priority-choice'], styles['priority-high']].join(" ")} 
              onClick={() => handlePriorityChange('high')}
              />
          </div>
        )}

        <Button onClick={handleDelete}>Удалить</Button>
      </div>
    </div>
  );
};

export default TaskItem;
