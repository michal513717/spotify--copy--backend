import express, { Application, Request, Response } from "express";
import DatabaseManager from "./database";
import AuthManager from "./managers/authManager";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const databaseManager = new DatabaseManager();
export const authManager = new AuthManager();

app.get("/", async (req: Request, res: Response): Promise<Response> => {    

    // console.log(databaseManager.insert('usersss', { name:'qwe', password:'abc' }));
    // console.log(await databaseManager.loadFromCollection('users'));
    // console.log(await databaseManager.getData('users'));

    return res.status(200).send({
        message: "Hello World!",
    });
});

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}