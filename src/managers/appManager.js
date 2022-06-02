class AppManager {
  uid = null;
  activeProjectID = null;
  userSignedIn = false;

  createProjectItem(title, active = false) {
    let projectItem = {
      title,
      active,
      todos: {},
    };

    return projectItem;
  }
}

export const appManager = new AppManager();
