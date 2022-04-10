import { ref, push, remove, update } from "firebase/database";
import { database } from "../firebase/firebase_init";

export function addTodoItem(userID, todoItem) {
  const todoItemsDBRef = ref(database, `/${userID}/items`);

  try {
    push(todoItemsDBRef, todoItem);
  }
  catch (error) {
    alert(error.message);
  }
}

export function updateTodoItem(userID, itemID, value) {
  const itemRef = ref(database, `${userID}/items/${itemID}`);
  
  try {
    update(itemRef, value);
  }
  catch (error) {
    alert(error.message);
  }
}

export function deleteTodoItem(userID, itemID) {
  const itemRef = ref(database, `${userID}/items/${itemID}`);
  
  try {
    remove(itemRef);
  }
  catch (error) {
    alert(error.message);
  }
}