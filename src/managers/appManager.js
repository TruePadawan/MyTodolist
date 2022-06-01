import { v4 as uuidv4 } from "uuid";
import { DB_actions } from "../functions/firebase_db";

class AppManager {
    #todoItemLocal(data)
    {
        const ID = uuidv4();
        data.id = ID;
        return data;
    }

    #todoItemToDB(data, projectID)
    {
        console.log(`storing ${data} in DB`);
    }

    #projectItemLocal(data)
    {

    }

    addTodoItem(isUserSignedIn, data, projectID = "")
    {
        if (!isUserSignedIn)
        {
            return this.#todoItemLocal(data);
        }
        this.#todoItemToDB(data, projectID);
    }

    // addProjectItem(isUserSignedIn, data)
    // {
    //     if (!isUserSignedIn)
    //     {
            
    //     }
    // }
}

export const appManager = new AppManager();