import { createContext, useEffect, useState } from "react";
import { firebaseAuthInstance as auth } from "../firebase/firebase_init";

export const AuthContext = createContext({
	authenticatedUserData: null,
});

export default function AuthContextProvider(props) {
	const [authenticatedUserData, setAuthenticatedUserData] = useState(null);

	// LISTEN FOR CHANGES IN AUTH STATE
	useEffect(() => {
		auth.onAuthStateChanged((authSnapshot) => {
			if (authSnapshot.currentUser) {
				setAuthenticatedUserData({
					uid: authSnapshot.currentUser.uid,
					displayName: authSnapshot.currentUser.displayName,
					email: authSnapshot.currentUser.email,
				});
			} else {
				setAuthenticatedUserData(null);
			}
		});
	}, []);

	const value = {
		authenticatedUserData,
	};
	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
}
