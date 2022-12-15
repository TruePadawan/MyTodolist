import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { firebaseAuthInstance as auth } from "../../../../firebase/firebase_init";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
function signInWithGoogle() {
	if (auth.currentUser === null) {
		signInWithPopup(auth, googleProvider);
	} else {
		signOut(auth);
	}
}
export default function GoogleAuthBtn() {
	const userDisplayName = auth.currentUser?.displayName;
	const btnText = userDisplayName || "Sign In";
	const accessibleTitle = auth.currentUser ? "Sign out" : "Sign in with google";
	return (
		<Button
			aria-label={accessibleTitle}
			title={accessibleTitle}
			variant="text"
			sx={{ color: "brown", fontWeight: "bold", fontFamily: "inherit" }}
			startIcon={<GoogleIcon />}
			onClick={signInWithGoogle}>
			{btnText}
		</Button>
	);
}
