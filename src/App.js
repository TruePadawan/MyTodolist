import { useContext, useState, Fragment } from "react";
import Header from "./components/layout/header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar";
import { TodoListContext } from "./context/TodoListContextProvider";
import TodoListHead from "./components/layout/todolist-head/TodoListHead";
import TodoListBody from "./components/layout/todolist-body/TodoListBody";
import Info from "./components/other/info/info";
import GoogleAuthBtn from "./components/other/button/GoogleAuthBtn/GoogleAuthBtn";
import { getActiveProject } from "./utils/other-utils";
import "./App.css";

export default function App() {
	const [loading, setLoading] = useState(false);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
	const { data } = useContext(TodoListContext);

	function toggleSidebar() {
		setSidebarIsOpen((snapshot) => !snapshot);
	}
	// RESPONSIBLE FOR LOADING IN THE PROJECT AND TODO DATA
	// const loadAppData = useCallback(
	// 	(snapshot) => {
	// 		const data = DB_actions.getAppData(snapshot);
	// 		setLoading(false);

	// 		// IF USER IS SIGNING IN FOR FIRST TIME, CREATE DEFAULT PROJECT
	// 		if (data === null) {
	// 			const item = appManager.createProjectItem("Default", true);
	// 			DB_actions.addProjectItem(appManager.uid, item);
	// 			return;
	// 		} else if (getActiveProjectID(data) === null) {
	// 			const updatedAppData = setNewActiveProject(data);
	// 			DB_actions.setProjects(appManager.uid, updatedAppData);
	// 			return;
	// 		}
	// 		// ELSE LOAD APPDATA
	// 		for (const id in data) {
	// 			if (data[id].active === true) {
	// 				appManager.activeProjectID = id;
	// 			}
	// 			if (!data[id].hasOwnProperty("todos")) {
	// 				data[id].todos = {};
	// 			}
	// 		}
	// 		setProjects(data);
	// 	},
	// 	[setLoading, setProjects]
	// );

	// When app loads, sign in the user if there was a previous sign in
	// useEffect(() => {
	// 	firebaseAuthInstance.onAuthStateChanged(function signUserIn() {
	// 		if (firebaseAuthInstance.currentUser && !appManager.userSignedIn) {
	// 			setLoading(true);
	// 			setUser(firebaseAuthInstance.currentUser.displayName);
	// 			appManager.userSignedIn = true;
	// 			appManager.uid = firebaseAuthInstance.currentUser.uid;

	// 			const appDataRef = ref(
	// 				firebaseRealtimeDBInstance,
	// 				`/${firebaseAuthInstance.currentUser.uid}/projects`
	// 			);
	// 			onValue(appDataRef, loadAppData);
	// 		}
	// 	});
	// }, [loadAppData]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (firebaseAuthInstance.currentUser === null) {
	// 			setLoading(false);

	// 			// CREATE DEFAULT PROJECT IF THERE IS NONE, ELSE LOAD EXISTING APP DATA
	// 			const appData = getLocalAppData();
	// 			const amountOfProjects = Object.keys(appData).length;
	// 			if (amountOfProjects === 0) {
	// 				const itemID = uuidv4();
	// 				const item = appManager.createProjectItem("Default", true);
	// 				const projects = {
	// 					[itemID]: item,
	// 				};

	// 				toLocalStorage(projects);
	// 				setProjects(projects);
	// 				return;
	// 			}
	// 			setProjects(appData);
	// 		}
	// 	}, 4000);
	// }, [setProjects]);

	// const activeProject = getActiveProject(projects, appManager.activeProjectID);
	const activeProjectData = getActiveProject(data);
	const mainClassName = sidebarIsOpen ? "sidebar-opened" : "sidebar-closed";

	return (
		<Fragment>
			<Info
				message={"Retrieving data from database..."}
				open={loading}
				onClose={false}
			/>
			<div className="App">
				<Header onSidebarBtnClicked={toggleSidebar} />
				<main className={mainClassName}>
					<Sidebar data={data} open={sidebarIsOpen}>
						<GoogleAuthBtn />
					</Sidebar>
					<section
						className="container"
						aria-labelledby="current-project-title">
						<h2 id="current-project-title" className="current-project-title">
							{activeProjectData.title}
						</h2>
						<div className="todolist">
							<TodoListHead
								appData={data}
								activeProjectData={activeProjectData}
							/>
							<TodoListBody
								projectID={activeProjectData.id}
								todos={activeProjectData.todos}
							/>
						</div>
					</section>
				</main>
			</div>
		</Fragment>
	);
}
