import { onValue, ref } from "firebase/database";
import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { firebaseRealtimeDBInstance as database } from "../firebase/firebase_init";
import { APP_LOCALSTORAGE_KEY } from "../utils/other-utils";
import { AuthContext } from "./AuthContextProvider";

export const TodoListContext = createContext({
	data: [],
});

const TodoListContextProvider = (props) => {
	const { authenticatedUserData } = useContext(AuthContext);
	const [data, setData] = useState(() => {
		const cachedData = localStorage.getObj(APP_LOCALSTORAGE_KEY);
		if (cachedData === null) {
			return [];
		}
		return cachedData;
	});

	const updateAppData = useCallback((snapshot) => {
		// TRANSFORM DATA
		console.log(snapshot);
	}, []);

	useEffect(() => {
		if (authenticatedUserData !== null) {
			// LOAD USER TODO DATA FROM DB
			const { id: userID } = authenticatedUserData;
			const appDataDBRef = ref(database, `/${userID}/projects`);
			return onValue(appDataDBRef, updateAppData);
		}
	}, [authenticatedUserData, updateAppData]);

	return (
		<TodoListContext.Provider value={data}>
			{props.children}
		</TodoListContext.Provider>
	);
};

export default TodoListContextProvider;
