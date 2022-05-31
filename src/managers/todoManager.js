import { v4 as uuidv4 } from "uuid";

class TodoManager {
    #local(data)
    {
        const ID = uuidv4();
        data.id = ID;
        return data;
    }

    #db(data)
    {
        console.log(`storing ${data} in DB`);
    }

    addTodoItem(isUserSignedIn, data)
    {
        if (!isUserSignedIn)
        {
            return this.#local(data);
        }
        this.#db(data);
    }
}

export const todoManager = new TodoManager();