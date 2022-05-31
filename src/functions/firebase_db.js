import { ref, push, remove, update } from "firebase/database";
import { database } from "../firebase/firebase_init";

export const DB_actions = {
  addTodoItem: function (userID, todoItem) {
    const todoItemsDBRef = ref(database, `/${userID}/items`);

    try {
      push(todoItemsDBRef, todoItem);
    } catch (error) {
      alert(error.message);
    }
  },

  updateTodoItem: function (userID, itemID, value) {
    const itemRef = ref(database, `${userID}/items/${itemID}`);

    try {
      update(itemRef, value);
    } catch (error) {
      alert(error.message);
    }
  },

  deleteTodoItem: function (userID, itemID) {
    const itemRef = ref(database, `${userID}/items/${itemID}`);

    try {
      remove(itemRef);
    } catch (error) {
      alert(error.message);
    }
  },

  getTodoItemsFromDB: function (snapshot) {
    const todoData = snapshot.val();
    const todoList = [];

    for (let id in todoData) {
      let todoItem = {
        [id]: {
          title: todoData[id].title,
          complete: todoData[id].complete,
        },
      };

      todoList.push(todoItem);
    }

    return todoList;
  },
};
