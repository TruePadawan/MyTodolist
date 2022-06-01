import { v4 as uuidv4 } from "uuid";
import { createProjectItem } from "../functions/projects";
import { DB_actions } from "../functions/firebase_db";

class AppManager {
    #todoItemLocal(data)
    {
        const ID = uuidv4();
        data.id = ID;
        return data;
    }

    #todoItemDB(data, projectID)
    {
        console.log(`storing ${data} in DB`);
    }

    #projectItemLocal(title)
    {
        return createProjectItem(title);
    }

    #projectItemDB(userID, data)
    {
        DB_actions.addProjectItem(userID, data);
    }

    addTodoItem(isUserSignedIn, data, projectID = "")
    {
        if (!isUserSignedIn)
        {
            return this.#todoItemLocal(data);
        }
        this.#todoItemDB(data, projectID);
    }

    addProjectItem(isUserSignedIn, data, userID = "")
    {
        if (!isUserSignedIn)
        {
            return this.#projectItemLocal(data.title);
        }
        this.#projectItemDB(userID, data);
    }
}

export const appManager = new AppManager();