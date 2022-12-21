import express, { Application, Request, Response } from "express";
import DatabaseManager from "./database";
import AuthManager from "./managers/authManager";
import FileManager from "./managers/fileManager";
import { IUsers } from "./models";

const app: Application = express();
const port = 3000;
var cors = require('cors')

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

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
app.post("/login", cors(), async (req: Request<{}, {}, IUsers, {}>, res:Response): Promise<Response> => {
    // Params, ResBody, ReqBody, ReqQuery and Locals

    const { userName, password } = req.body;

    const isLoginSuccesfull = await authManager.login(userName, password);

    if(isLoginSuccesfull === false){
        return res.status(401).send({
            isLogginSuccesfull: false,
            message: "Bad login or incorrect password",
        });
    };

    return res.status(200).send({
        isLogginSuccesfull: true,
        message: "Login Successful",
    });
});


app.post("/register", async (req: Request< {}, {} , IUsers, {}>, res: Response): Promise<Response> => {

    const { userName, password } = req.body;

    const isRegisteredSuccesfull = await authManager.register(userName, password);

    if(isRegisteredSuccesfull === false){
        return res.status(401).send({
            isRegisteredSuccesfull: false,
            message: "The username is alredy used",
        });
    }

    return res.status(200).send({
        isRegisteredSuccesfull: true,
        message: "Register Successful"
    });
});

app.get("/avaliblealbums", async (req: Request, res: Response): Promise<Response> => {

    const avalibleAlbums = await fileManager.getAlbums();

    console.log(avalibleAlbums);

    return res.status(200).send({
        avalibleAlbums: avalibleAlbums,
        message: "Loaded avalible albums Succesfully"
    });
});

app.get("/avaliblealbums/:albumName", async (req: Request, res: Response): Promise<Response> => {
    
    const albumName = req.params.albumName;

    const avalibleMusicList = await fileManager.getMusic(albumName);

    if(avalibleMusicList.length > 0){

        return res.status(200).send({
            avalibleMusicList: avalibleMusicList,
            message: "Loaded avalible music Succesfully"
        });
    }

    return res.status(200).send({ // it should be 200? // to remake //temponary
        avalibleMusicList: avalibleMusicList,
        message: "Empty album or Error"
    });
});


try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}