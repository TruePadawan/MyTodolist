import ProjectItem from "../components/item/ProjectItem/ProjectItem";

export function setActiveProject(projectID, projectsList) {
	const projectIDs = Object.keys(projectsList);
	projectIDs.forEach((id) => {
		if (id !== projectID) {
			projectsList[id].active = false;
		} else {
			projectsList[id].active = true;
		}
	});

	return { ...projectsList };
}

export function createJSXProjectItems(list) {
	let IDs = Object.keys(list);
	let projectsList = IDs.map((id) => {
		let title = list[id].title;
		let status = list[id].active;
		return <ProjectItem id={id} title={title} active={status} key={id} />;
	});
	return projectsList;
}

export function setNewActiveProject(list) {
	const IDs = Object.keys(list);
	if (IDs.length === 0) {
		return null;
	}
	let firstItemID = IDs[0];
	list[firstItemID].active = true;
	return { ...list };
}

export function getActiveProjectID(list) {
	const IDs = Object.keys(list);
	for (let i = 0; i < IDs.length; ++i) {
		if (list[IDs[i]].active === true) {
			return IDs[i];
		}
	}
	return null;
}

export function getActiveProject(projects, id) {
	if (id === null) {
		return {
			title: "",
			todos: {},
		};
	}
	return projects[id];
}

export function toLocalStorage(data) {
	window.localStorage.setObj("projects", data);
}

export function getLocalAppData() {
	return window.localStorage.getObj("projects");
}
