import styles from "./Header.module.css";
import MenuBtnImg from "./resources/menu.png";

const Header = () => {
  return (
    <header>
      <nav>
        <button type="button" className={styles["sidebarBtn"]}>
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
