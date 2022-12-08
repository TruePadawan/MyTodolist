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
			if (authSnapshot) {
				setAuthenticatedUserData({
					uid: authSnapshot.uid,
					displayName: authSnapshot.displayName,
					email: authSnapshot.email,
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
