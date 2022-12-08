import { useState, Fragment } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateTodoItemDialog from "../../other/dialog/CreateTodoItemDialog/CreateTodoItemDialog";
import DateTime from "../../other/datetime/datetime";
import { Button } from "@mui/material";
import styles from "./styles.module.css";

const TodoListHead = ({ activeProjectData }) => {
	const [showCreateItemDialog, setShowCreateItemDialog] = useState(false);

	function dialogOpenHandler() {
		setShowCreateItemDialog(true);
	}

	function dialogCloseHandler() {
		setShowCreateItemDialog(false);
	}

	const btnStyles = {
		width: "100%",
		height: "100%",
		fontFamily: "inherit",
		borderRadius: "inherit",
		color: "brown",
		backgroundColor: "#deaf72",
		"&:hover": {
			backgroundColor: "#a8885d",
		},
		"&:active": {
			backgroundColor: "burlywood",
		},
	};

	const noActiveProject = activeProjectData === null;
	return (
		<Fragment>
			{!noActiveProject && (
				<CreateTodoItemDialog
					open={showCreateItemDialog}
					onClose={dialogCloseHandler}
					projectID={activeProjectData.id}
				/>
			)}
			<div className={styles["todolist-header-outer"]}>
				<DateTime />
				<div className={styles["todolist-header"]}>
					<Button
						sx={btnStyles}
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
