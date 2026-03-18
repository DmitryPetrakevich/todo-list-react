import { motion, AnimatePresence } from "framer-motion";
import styles from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ tasks, title, onDelete, onToggle, onDeadlineChange, onPriorityChange  }) => {
  return (
    <div>
      <h1 className={styles.title} style={{ margin: "20px 0" }}>
        {title}
      </h1>

      <div className={styles.taskList}>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              <TaskItem
              task={task}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;
