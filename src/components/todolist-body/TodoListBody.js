import { useState } from "react";

import styles from "./TodoListBody.module.css";

const DUMMY_DATA = [
  {
    title: "Do the Laundry",
    status: false,
  },
  {
    title: "Read a Book",
    status: false,
  },
  {
    title: "Work on ReactJS Project",
    status: true,
  },
  {
    title: "Read a Book",
    status: false,
  },
  {
    title: "Read a Book",
    status: false,
  },
  {
    title: "Read a Book",
    status: false,
  },
  {
    title: "Read a Book",
    status: false,
  },
];

const TodoListItem = (props) => {
  const [isTaskDone, setIsTaskDone] = useState(props.status);

  function changeTaskStatus() {
    setIsTaskDone((current) => !current);
  }

  return (
    <li
      className={`${styles["todolist-item"]} ${
        styles[isTaskDone ? "task_done" : ""]
      }`}
    >
      <p onClick={changeTaskStatus}>{props.title}</p>
      <button>Edit</button>
    </li>
  );
};

const TodoListBody = () => {
  let listOfTasks = (
    <ul>
      {DUMMY_DATA.map((task) => (
        <TodoListItem title={task.title} status={task.status} />
      ))}
    </ul>
  );

  return <div className={styles["todolist-body"]}>{listOfTasks}</div>;
};

export default TodoListBody;
