import { Box, Modal as MUIModal } from "@mui/material";

const Modal = (props) => {
	const styles = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "min(98%, 40rem)",
		bgcolor: "#fadea1",
		boxShadow: 24,
		p: 2,
	};

	return (
		<MUIModal open={props.open} onClose={props.onClose}>
			<Box {...props.containerProps} sx={styles}>{props.children}</Box>
		</MUIModal>
	);
};

export default Modal;
