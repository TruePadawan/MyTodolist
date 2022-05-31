import { DB_actions } from "../functions/firebase_db";

class Controller {
  #userLoggedIn;
  #userID;

  constructor() {
    this.#userLoggedIn = false;
  }

  set userLoggedIn(isLoggedIn) {
    this.#userLoggedIn = isLoggedIn;
  }

  set userID(id) {
    this.#userID = id;
  }

  get userLoggedIn() {
    return this.#userLoggedIn;
  }

  get userID() {
    return this.#userID;
  }

  generateID(itemTitle) {
    return `${Date.now()}${itemTitle[itemTitle.length - 1]}`;
  }

  newTaskItem_Local(title) {
      const id = this.generateID(title);

      const todoItem = { 
        [id]: {
          title,
          complete: false
        }
      };

      return todoItem;
  }

  newTaskItem_Database(title) {
      const todoItem = { title, complete: false };
      DB_actions.addTodoItemToDB(this.#userID, todoItem);
  }

  updateTodoItemInDB(itemID, value) {
    DB_actions.updateTodoItem(this.#userID, itemID, value);
  }

  deleteTodoItemFromDB(itemID) {
    DB_actions.deleteTodoItem(this.#userID, itemID);
  }
}

export const MainController = new Controller();