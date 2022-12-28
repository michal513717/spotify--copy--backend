import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import { IUsers } from '../models';
import { authManager, fileManager } from '..';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(){

        this.app.route('login')
            .post(async(req: express.Request<{}, {}, IUsers, {}>, res: express.Response) => {
                
                const loginStatus = await this.loginPost(req.body);

                if(loginStatus === true){
                    return res.status(401).send({
                        isActionSuccess: true,
                        isLogginSuccesfull: false,
                        message: "Bad login or incorrect password",
                    });
                }

                return res.status(200).send({
                    isActionSuccess: true,
                    isLogginSuccesfull: true,
                    message: "Login Successful",
                });
            })


            
        this.app.route("/avaliblealbums")
            .get(async (req: express.Request, res: express.Response) => {

                const avalibleAlbums = await fileManager.getAlbums();

                console.log(avalibleAlbums);

                return res.status(200).send({
                    isActionSuccess: true,
                    avalibleAlbums: avalibleAlbums,
                    message: "Loaded avalible albums Succesfully"
                });
        });

        return this.app;
    }

    private async loginPost(data:IUsers): Promise<boolean>{

        const { userName, password } = data;

        const isLoginSuccesfull = await authManager.login(userName, password);

        return isLoginSuccesfull;
    }
}

// app.post("/register", async (req: Request< {}, {} , IUsers, {}>, res: Response): Promise<Response> => {

//     const { userName, password } = req.body;

//     const isRegisteredSuccesfull = await authManager.register(userName, password);

//     if(isRegisteredSuccesfull === false){
//         return res.status(401).send({
//             isActionSuccess: true,
//             isRegisteredSuccesfull: false,
//             message: "The username is alredy used",
//         });
//     }

//     return res.status(200).send({
//         isActionSuccess: true,
//         isRegisteredSuccesfull: true,
//         message: "Register Successful"
//     });
// });

// app.get("/avaliblealbums", async (req: Request, res: Response): Promise<Response> => {

//     const avalibleAlbums = await fileManager.getAlbums();

//     console.log(avalibleAlbums);

//     return res.status(200).send({
//         isActionSuccess: true,
//         avalibleAlbums: avalibleAlbums,
//         message: "Loaded avalible albums Succesfully"
//     });
// });

// app.get("/avaliblealbums/:albumName", async (req: Request, res: Response): Promise<Response> => {
    
//     const albumName = req.params.albumName;

//     const avalibleMusicList = await fileManager.getMusic(albumName);

//     if(avalibleMusicList.length > 0){

//         return res.status(200).send({
//             isActionSuccess: true,
//             avalibleMusicList: avalibleMusicList,
//             message: "Loaded avalible music Succesfully"
//         });
//     }

//     return res.status(200).send({ // it should be 200? // to remake //temponary
//         isActionSuccess: true,
//         avalibleMusicList: avalibleMusicList,
//         message: "Empty album or Error"
//     });
// });