import sl from "./CreateTaskModal.module.css"
import { useDispatch, useSelector } from "react-redux";

import MyInput from "../ui/Input/MyInput";
import Button from "../ui/Button/Button";
import MySelect from "../Sorter/MySelect";

import {
    toggleModal,
    addTask,
    selectTaskBody,
    updateTaskBody,
} from '../../store/slices/todoSlice'


const CreateTaskModal = () => {
    const dispatch = useDispatch()

     const taskBody = useSelector(selectTaskBody)

    const handleToggleModal = () => {
        dispatch(toggleModal())
    }

    const handleAddTask = () => {
      if(taskBody.trim() === "") return;
    
      dispatch(addTask({body: taskBody}))
      dispatch(updateTaskBody(""))
      handleToggleModal();
    }
    
    const handleBodyChange = (e) => {
      dispatch(updateTaskBody(e.target.value))
    }

  return (
    <div className={sl["modal-overlay"]} onClick={handleToggleModal}>
        <div className={sl.modal} onClick={(e) => e.stopPropagation()}>
        <MyInput
        value={taskBody}
        onChange={(e) => handleBodyChange(e)}
        placeholder="Название задачи..."    
        style={{width: '100%'}}
        />

        <Button 
        onClick={handleAddTask}
        >
          Создать задачу
        </Button>

        </div>
    </div>
  );
};

export default CreateTaskModal;
