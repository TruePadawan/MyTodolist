import { addTodoItem, updateTodoItem, deleteTodoItem } from "../functions/firebase_db";

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
      const taskItem = { id, title, complete: false };
      return taskItem;
  }

  newTaskItem_Database(title) {
      const todoItem = { title, complete: false };
      addTodoItem(this.#userID, todoItem);
  }

  updateTodoItemInDB(itemID, value) {
    updateTodoItem(this.#userID, itemID, value);
  }

  deleteTodoItemFromDB(itemID) {
    deleteTodoItem(this.#userID, itemID);
  }
}

export const MainController = new Controller();