import { storeTodoItemInDB } from "../functions/firebase_db";

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
      console.log('Creating DB Item');
      // SEND TASK ITEM TO FIREBASE DB AND GET THE ITEM ID

      storeTodoItemInDB(this.#userID, todoItem);
  }
}

export const MainController = new Controller();