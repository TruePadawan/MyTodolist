import { useState, Fragment } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateTodoItemDialog from "../../other/dialog/CreateTodoItemDialog/CreateTodoItemDialog";
import DateTime from "../../other/datetime/datetime";
import { Button } from "@mui/material";
import styles from "./styles.module.css";

const TodoListHead = ({ appData: data }) => {
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
			{showNewItemDialog && (
				<CreateTodoItemDialog onClose={dialogCloseHandler} />
			)}
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
