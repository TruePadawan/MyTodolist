import { useMemo, useState, useContext } from "react";
import { TodoListContext } from "../../context/TodoListContextProvider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import NewItem from "./NewItem/NewItem";

import "./TodoListHeader.css";

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  /* Update the time every 1 second */
  setTimeout(() => {
    setCurrentTime(new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }));
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
  const { noProjects } = useContext(TodoListContext);
  const [onAddNewItem, setOnAddNewItem] = useState(false);

  function openDialogHandler() {
    setOnAddNewItem(true);
  }

  function closeDialogHandler() {
    setOnAddNewItem(false);
  }

  return (
    <>
      {onAddNewItem && (
        <NewItem closeDialog={closeDialogHandler} />
      )}
      <div className="todolist--header-outer">
        <DateTime />
        <div className="todolist--header">
          <ButtonUnstyled onClick={openDialogHandler} disabled={noProjects}>
            <AddCircleOutlineIcon />
            New Item
          </ButtonUnstyled>
        </div>
      </div>
    </>
  );
};

export default TodoListHeader;
