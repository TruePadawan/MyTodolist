import { LinearProgress } from "@mui/material";
import Modal from "../modal/Modal";

const Info = (props) => {
	return (
		<Modal
			open={props.open}
			onClose={props.onClose}
			containerProps={{ style: { borderRadius: "2px" } }}>
			<div
				style={{ fontWeight: "500", fontSize: "1.5rem" }}
				className="text-center d-flex flex-column gap-1">
				{props.message}
        <LinearProgress color="error" />
			</div>
		</Modal>
	);
};

export default Info;
