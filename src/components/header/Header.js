import styles from "./Header.module.css";
import MenuBtnImg from "./resources/menu.png";
import { useContext } from "react";
import TodoListContext from "../context/TodoListContext";

const Header = () => {
  const { setSideBarState } = useContext(TodoListContext);

  function toggleSidebar() {
    setSideBarState((currentState) => {
      return currentState === "closed" ? "opened" : "closed";
    });
  }

  return (
    <header>
      <nav>
        <button
          type="button"
          className={styles["sidebarBtn"]}
          onClick={toggleSidebar}
        >
          <img src={MenuBtnImg} alt="Sidebar" />
        </button>
        <div className={styles["navMain"]}>
          <h1>MyTodoList</h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;
