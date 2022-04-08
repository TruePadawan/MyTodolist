import { ref, push, remove, update } from "firebase/database";
import { database } from "../firebase/firebase_init";

export function addTodoItem(userID, todoItem) {
  const todoItemsDBRef = ref(database, `/${userID}/items`);
  let success;
  let key = '';

  try {
    const itemRef = push(todoItemsDBRef, todoItem);
    key = itemRef.key;
    success = true;
  }
  catch (error) {
    alert(error.message);
    success = false;
  }

  return { success,key };
}

export function updateTodoItem(userID, itemID, value) {
  try {
    const itemRef = ref(database, `${userID}/items/${itemID}`);
    update(itemRef, value);
  }
  catch (error) {
    alert(error.message);
  }
}

export function deleteTodoItem(userID, itemID) {
  try {
    const itemRef = ref(database, `${userID}/items/${itemID}`);
    remove(itemRef);
  }
  catch (error) {
    alert(error.message);
  }
}