import { v4 as uuidv4 } from "uuid";
import { createProjectItem } from "../functions/projects";
import { DB_actions } from "../functions/firebase_db";

class AppManager {
    uid = null;
    activeProjectID = null;
    userSignedIn = false;

    setUID(id)
    {
        this.uid = id;
    }
    
    setUserSignedIn(value)
    {
        this.userSignedIn = value;
    }

    setActiveProjectID(id)
    {
        this.activeProjectID = id;
    }

    #todoItemLocal(data)
    {
        const ID = uuidv4();
        data.id = ID;
        return data;
    }

    #todoItemDB(data, projectID)
    {
        console.log(`storing ${data} in DB`);
        DB_actions.addTodoItem(this.uid, projectID, data);
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

    addProjectItem(isUserSignedIn, data)
    {
        if (!isUserSignedIn)
        {
            return this.#projectItemLocal(data.title);
        }
        this.#projectItemDB(this.uid, data);
    }
}

export const appManager = new AppManager();