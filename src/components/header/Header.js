import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import styles from "./styles.module.css";

const Header = (props) => {
	return (
		<header className={styles.header}>
			<IconButton
				type="button"
				className={styles["sidebar-btn"]}
				onClick={props.onSidebarBtnClicked}>
				<Menu />
			</IconButton>
			<h1 className={styles["header-text"]}>MyTodoList</h1>
		</header>
	);
};

export default Header;
