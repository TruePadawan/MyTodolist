import ProjectItem from "../components/sidebar/ProjectItem/ProjectItem";
import { v4 as uuidv4 } from "uuid";

export function createProjectItem(_title, active = false) {
  let projectID = uuidv4();
  let projectItem = {
    id: projectID,
    title: _title,
    active,
    todos: {},
  };

  return projectItem;
}

export function setActiveProject(projectID, projectsList) {
  const projectIDs = Object.keys(projectsList);
  projectIDs.forEach((id) => {
    if (id !== projectID) {
      projectsList[id].active = false;
    } else {
      projectsList[id].active = true;
    }
  });

  return projectsList;
}

export function createJSXProjectItems(list) {
  let IDs = Object.keys(list);
  let projectsList = IDs.map((id) => {
    let title = list[id].title;
    let status = list[id].active;
    return <ProjectItem title={title} active={status} key={id} />;
  });
  return projectsList;
}


export function persistProjectsListData(list, userSignedIn)
{
  if (!userSignedIn)
  {
    window.localStorage.setObj("projects", list);
    return;
  }
  console.log('storing data to DB');
}