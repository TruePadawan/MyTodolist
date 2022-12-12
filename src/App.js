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

	const activeProjectData = getActiveProject(data);
	if (activeProjectData?.todos === undefined) {
		activeProjectData.todos = {};
	}
	const mainClassName = sidebarIsOpen ? "sidebar-opened" : "sidebar-closed";

	return (
		<Fragment>
			<Info
				message={"Retrieving data from database..."}
				open={loading}
				onClose={() => false}
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
