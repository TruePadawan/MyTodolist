import { ref, push } from "firebase/database";
import { database } from "../firebase/firebase_init";

export function storeTodoItemInDB(userID, todoItem) {
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
