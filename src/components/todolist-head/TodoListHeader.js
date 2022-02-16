import { useMemo, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddTaskIcon from "@mui/icons-material/AddTask";
import styles from "./TodoListHeader.module.css";

const TodoListHeader = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

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
    return [date.getDate(), months[date.getMonth()]];
  }, []);

  return (
    <div className={styles["todolist--header-outer"]}>
      <div className={styles["date-time"]}>
        <p>
          {currentDate[0]}. {currentDate[1]}
        </p>
        <p>{currentTime}</p>
      </div>

      <div className={styles["todolist--header"]}>
        <Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>
          New Task
        </Button>
      </div>
    </div>
  );
};

export default TodoListHeader;
