import { useMemo, useState, useContext } from "react";
import { sortBasedOnCompletion, sortBasedOnUncompletion } from "../../functions/sortFunctions";

import { MainController } from "../../controller/controller";

import TodoListContext from "../context/TodoListContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import NewTaskDialog from "./NewTaskDialog";

import "./TodoListHeader.css";

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  /* Update the time every 1 second */
  setTimeout(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  let currentDate = useMemo(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    return `${date.getDate()}. ${months[date.getMonth()]}`;
  }, []);

  return (
    <div className="date-time">
      <p>{currentDate}</p>
      <p>{currentTime}</p>
    </div>
  );
};





const TodoListHeader = () => {
  const { setContextData } = useContext(TodoListContext);
  const [newTaskDialogOpened, setNewTaskDialogOpened] = useState(false);

  function openDialogHandler() {
    setNewTaskDialogOpened(true);
  }

  function closeDialogHandler() {
    setNewTaskDialogOpened(false);
  }

  function sortItems(e) {
    const btnValue = e.target.textContent;

    if (btnValue === "Done") {
      setContextData(currentContextData => {
        let sortedTaskList = sortBasedOnCompletion(currentContextData.taskList);
        
        if (!MainController.userLoggedIn)
        {
          window.localStorage.setObj("taskList", sortedTaskList);
        }
        return { taskList: sortedTaskList };
      });
    }
    else if (btnValue === "Not Done") {
      setContextData(currentContextData => {
        let sortedTaskList = sortBasedOnUncompletion(currentContextData.taskList);
        
        if (!MainController.userLoggedIn)
        {
          window.localStorage.setObj("taskList", sortedTaskList);
        }
        return { taskList: sortedTaskList };
      });
    }
  }

  return (
    <>
      {newTaskDialogOpened && (
        <NewTaskDialog closeDialog={closeDialogHandler} />
      )}
      <div className="todolist--header-outer">
        <DateTime />

        <div className="todolist--header">
          <ButtonUnstyled onClick={openDialogHandler}>
            <AddCircleOutlineIcon />
            New Item
          </ButtonUnstyled>

          <ButtonGroup disableElevation disableRipple variant="text">
            <Button onClick={sortItems}>Done</Button>
            <Button onClick={sortItems}>Not Done</Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default TodoListHeader;
