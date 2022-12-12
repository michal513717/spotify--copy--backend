import express, { Application, Request, Response } from "express";
import DatabaseManager from "./database";
import AuthManager from "./managers/authManager";
import FileManager from "./managers/fileManager";
import { IUsers } from "./models";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const databaseManager = new DatabaseManager();
export const authManager = new AuthManager();
export const fileManager = new FileManager();

app.get("/", async (req: Request, res: Response): Promise<Response> => {    

    // console.log(databaseManager.insert('usersss', { name:'qwe', password:'abc' }));
    // console.log(await databaseManager.loadFromCollection('users'));
    // console.log(await databaseManager.getData('users'));

    return res.status(200).send({
        message: "Hello World!",
    });
});

// app.get<IUsers, boolean, {}, IUsers>("/login", async  (req, res): Promise<Response> => {
app.get("/login", async (req: Request<{}, {}, {}, IUsers>, res:Response): Promise<Response> => {
    // Params, ResBody, ReqBody, ReqQuery and Locals

    const { userName, password } = req.query;

    const isLoginSuccesfull = await authManager.login(userName, password);

    if(isLoginSuccesfull === false){
        return res.status(401).send({
            message: "Bad login or incorrect password",
        });
    };

    return res.status(200).send({
        message: "Login Successful",
    })
});


app.get("/register", async (req: Request<{}, {}, {}, IUsers>, res: Response): Promise<Response> => {

    const { userName, password } = req.query;

    const isRegisteredSuccesfull = await authManager.register(userName, password);

    if(isRegisteredSuccesfull === false){
        return res.status(401).send({
            message: "The username is alredy used",
        });
    }

    return res.status(200).send({
        message: "Register Successful"
    })
})

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}