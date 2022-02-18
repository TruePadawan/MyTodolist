import { useMemo, useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import ToggleButton from "@mui/material/ToggleButton";

import ButtonUnstyled from "@mui/base/ButtonUnstyled";

import styles from "./TodoListHeader.module.css";

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
    <div className={styles["date-time"]}>
      <p>{currentDate}</p>
      <p>{currentTime}</p>
    </div>
  );
};

const TodoListHeader = () => {
  return (
    <div className={styles["todolist--header-outer"]}>
      <DateTime />

      <div className={styles["todolist--header"]}>
        <ButtonUnstyled>
          <AddCircleOutlineIcon />
          New Task
        </ButtonUnstyled>

        <select>
          <option value="all">All</option>
          <option value="not_done">Not Done</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TodoListHeader;
