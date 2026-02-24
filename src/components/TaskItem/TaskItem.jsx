import styles from "./TaskItem.module.css";
import Button from "../ui/Button/Button";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";

const TaskItem = ({body, done, deadline, onDelete, onToggle, onDeadlineChange,}) => {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
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

    onDeadlineChange(formattedDate);

    setIsDatePickerOpen(false);
  };

  return (
    <div className={styles.taskItem}>
      <div className={styles["task-left"]}>
        <input
          className={styles.checkbox}
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
                onClickOutside={() => setIsDatePickerOpen(false)} // закрыть при клике вне
              />
            </div>
          )}
        </div>
      </div>

      <Button onClick={onDelete}>Удалить</Button>
    </div>
  );
};

export default TaskItem;
