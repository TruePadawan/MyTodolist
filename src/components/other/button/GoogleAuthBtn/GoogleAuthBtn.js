import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { firebaseAuthInstance } from "../../../../firebase/firebase_init";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";

const googleProvider = new GoogleAuthProvider();
export default function GoogleAuthBtn() {
	const { authenticatedUserData } = useContext(AuthContext);

	function signInWithGoogle() {
		// IF THERE IS NO USER CURRENTLY LOGGED IN, LOGIN. ELSE, SIGN OUT
		if (firebaseAuthInstance.currentUser === null) {
			signInWithPopup(firebaseAuthInstance, googleProvider);
		} else {
			signOut(firebaseAuthInstance);
		}
	}

	const userDisplayName = authenticatedUserData?.displayName;
	const btnText = userDisplayName || "Sign In";
	return (
		<Button
			aria-label="Sign in with google"
			title="Sign in with google"
			variant="text"
			sx={{ color: "brown", fontWeight: "bold", fontFamily: "inherit" }}
			startIcon={<GoogleIcon />}
			onClick={signInWithGoogle}>
			{btnText}
		</Button>
	);
}
