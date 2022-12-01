import { useState, useContext, Fragment } from "react";
import { TodoListContext } from "../../context/TodoListContextProvider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateTodoItemDialog from "../dialogs/CreateTodoItemDialog/CreateTodoItemDialog";
import DateTime from "../datetime/datetime";
import { Button } from "@mui/material";
import styles from "./styles.module.css";

const TodoListHead = () => {
	const { data } = useContext(TodoListContext);
	const [showNewItemDialog, setShowNewItemDialog] = useState(false);

	function dialogOpenHandler() {
		setShowNewItemDialog(true);
	}

	function dialogCloseHandler() {
		setShowNewItemDialog(false);
	}

	const noActiveProject = Object.keys(data).length === 0;
	return (
		<Fragment>
			{showNewItemDialog && <CreateTodoItemDialog onClose={dialogCloseHandler} />}
			<div className={styles["todolist-header-outer"]}>
				<DateTime />
				<div className={styles["todolist--header"]}>
					<Button
						startIcon={<AddCircleOutlineIcon />}
						onClick={dialogOpenHandler}
						disabled={noActiveProject}>
						New Item
					</Button>
				</div>
			</div>
		</Fragment>
	);
};

export default TodoListHead;
