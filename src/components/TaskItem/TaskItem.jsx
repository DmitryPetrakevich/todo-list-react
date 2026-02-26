import styles from "./TaskItem.module.css";
import Button from "../ui/Button/Button";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import { style } from "framer-motion/client";

const TaskItem = ({
  taskId, 
  body, 
  done,
  deadline,
  priority,
  onDelete,
  onToggle,
  onDeadlineChange,
  onPriorityChange,
}) => {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPriorityPickerOpen, setIsPriorityPickerOpen] = useState(false)
  
  const deadlineDate = deadline ? new Date(deadline) : new Date();

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

    onDeadlineChange(taskId, formattedDate);

    setIsDatePickerOpen(false);
  };

  const handlePriorityChange = (selectedPriority) => {
    onPriorityChange(taskId, selectedPriority)
    setIsPriorityPickerOpen(false);
  }

  return (
    <div className={[
      styles.taskItem,
      priority === "high" && styles.high,
      priority === 'medium' && styles.medium,
      priority === 'low' && styles.low
    ].join(" ")
    }>
      <div className={styles["task-left"]}>
        <input
          className={[styles['checkbox'], styles[`checkbox-${priority}`]].join(" ")}
          type="checkbox"
          checked={done}
          onChange={onToggle}
        />

        <div className={styles.taskContent}>
          <span className={done ? styles.done : ""}>{body}</span>

          <button
            className={styles.deadlineButton}
            onClick={() => setIsDatePickerOpen(true)}
          >
            {formatDate(deadline)}
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
        className={[styles['priority-indicator'], styles[`priority-${priority}`]].join(" ")} 
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

        <Button onClick={onDelete}>Удалить</Button>
      </div>
    </div>
  );
};

export default TaskItem;
