import { ref, push, remove, update } from "firebase/database";
import { database } from "../firebase/firebase_init";

export const DB_actions = {
  addProjectItem: function (userID, projectItem) {
    const databaseRef = ref(database, `/${userID}/projects`);

    try {
      push(databaseRef, projectItem);
    }
    catch (error)
    {
      alert(error.message);
    }
  },

  addTodoItem: function (userID, projectID, todoItem) {
    const databaseRef = ref(database, `/${userID}/projects/${projectID}/todos`);

    try {
      push(databaseRef, todoItem);
    }
    catch (error)
    {
      alert(error.message);
    }
  },

  updateProjectItem: function (userID, projectID, value) {
    const databaseRef = ref(database, `/${userID}/projects/${projectID}`);

    try {
      update(databaseRef, value);
    }
    catch (error)
    {
      alert(error.message);
    }
  },

  updateTodoItem: function (userID, projectID, itemID, value) {
    const databaseRef = ref(database, `/${userID}/projects/${projectID}/${itemID}`);

    try {
      update(databaseRef, value);
    }
    catch (error) {
      alert(error.message)
    }
  },

  deleteProjectItem: function (userID, projectID) {
    const databaseRef = ref(database, `/${userID}/projects/${projectID}`);

    try {
      remove(databaseRef);
    }
    catch (error) {
      alert(error.message);
    }
  },

  deleteTodoItem: function (userID, projectID, itemID) {
    const databaseRef = ref(database, `/${userID}/projects/${projectID}/${itemID}`);

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
