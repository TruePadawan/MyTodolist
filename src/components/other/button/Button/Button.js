import { Button as MUIButton } from "@mui/material";

export default function Button({ children, sx, ...otherProps }) {
	const btnStyles = {
		width: "100%",
		height: "100%",
		fontFamily: "inherit",
		borderRadius: "inherit",
		color: "brown",
		backgroundColor: "#deaf72",
		boxShadow:
			"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
		"&:hover": {
			backgroundColor: "#a8885d",
		},
		"&:active": {
			backgroundColor: "burlywood",
		},
		...sx,
	};
	
	return (
		<MUIButton {...otherProps} sx={btnStyles}>
			{children}
		</MUIButton>
	);
}
