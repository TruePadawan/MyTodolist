import { ref, push, remove, update, set } from "firebase/database";
import { firebaseRealtimeDBInstance } from "../firebase/firebase_init";

export const DB_actions = {
  setProjects: function (userID, projects) {
    const databaseRef = ref(firebaseRealtimeDBInstance, `/${userID}/projects`);

    try {
      set(databaseRef, projects);
    }
    catch (error) {
      alert(error.message);
    }
  },

  addProjectItem: function (userID, projectItem) {
    const databaseRef = ref(firebaseRealtimeDBInstance, `/${userID}/projects`);

    try {
      push(databaseRef, projectItem);
    }
    catch (error)
    {
      alert(error.message);
    }
  },

  addTodoItem: function (userID, projectID, todoItem) {
    const databaseRef = ref(firebaseRealtimeDBInstance, `/${userID}/projects/${projectID}/todos`);

    try {
      push(databaseRef, todoItem);
    }
    catch (error)
    {
      alert(error.message);
    }
  },

  updateProjectItem: function (userID, projectID, value) {
    const databaseRef = ref(firebaseRealtimeDBInstance, `/${userID}/projects/${projectID}`);

    try {
      update(databaseRef, value);
    }
    catch (error)
    {
      alert(error.message);
    }
  },

  updateTodoItem: function (userID, projectID, itemID, value) {
    const databaseRef = ref(firebaseRealtimeDBInstance, `/${userID}/projects/${projectID}/todos/${itemID}`);

    try {
      update(databaseRef, value);
    }
    catch (error) {
      alert(error.message)
    }
  },

  deleteProjectItem: function (userID, projectID) {
    const databaseRef = ref(firebaseRealtimeDBInstance, `/${userID}/projects/${projectID}`);

    try {
      remove(databaseRef);
    }
    catch (error) {
      alert(error.message);
    }
  },

  deleteTodoItem: function (userID, projectID, itemID) {
    const databaseRef = ref(firebaseRealtimeDBInstance, `/${userID}/projects/${projectID}/todos/${itemID}`);

    try {
      remove(databaseRef);
    }
    catch (error) {
      alert(error.message)  
    }
  },

  getAppData: function (snapshot) {
    const data = snapshot.val();
    return data;
  }
};
