import { createContext, useEffect, useState } from "react";
import { firebaseAuthInstance as auth } from "../firebase/firebase_init";

export const AuthContext = createContext({
	authenticatedUserData: null,
});

export default function AuthContextProvider(props) {
	const [authenticatedUserData, setAuthenticatedUserData] = useState(null);

	// LISTEN FOR CHANGES IN AUTH STATE
	useEffect(() => {
		auth.onAuthStateChanged(() => {
			setAuthenticatedUserData((snapshot) => {
				if (auth.currentUser && snapshot === null) {
					return {
						uid: auth.currentUser.uid,
						displayName: auth.currentUser.displayName,
						email: auth.currentUser.email,
					};
				}
				return snapshot;
			});
		});
	}, []);

	const value = {
		authenticatedUserData,
	};
	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
}
