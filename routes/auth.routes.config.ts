import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import { IUsers } from '../models';
import { authManager, fileManager } from '..';

export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(){

        this.app.route('/login')
            .post(async(req: express.Request<{}, {}, IUsers, {}>, res: express.Response) => {
                
                const loginStatus = await this.loginPost(req.body);

                if(loginStatus === false){
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


        this.app.route('/register')
            .post(async(req: express.Request<{}, {}, IUsers, {}>, res: express.Response) => {
                
                const registerStatus = await this.registerPost(req.body);
                console.log(registerStatus)
                if(registerStatus === false){
                    return res.status(401).send({
                        isActionSuccess: true,
                        isRegisteredSuccesfull: false,
                        message: "The username is alredy used",
                    });
                }

                return res.status(200).send({
                    isActionSuccess: true,
                    isRegisteredSuccesfull: true,
                    message: "Register Successful"
                });
            })


            
        this.app.route("/avaliblealbums")
            .get(async (req: express.Request, res: express.Response) => {

                const avalibleAlbums = await fileManager.getAlbums();

                return res.status(200).send({
                    isActionSuccess: true,
                    avalibleAlbums: avalibleAlbums,
                    message: "Loaded avalible albums Succesfully"
                });
        });

        this.app.route("/avaliblealbums/:albumName")
            .get(async (req: express.Request, res: express.Response) => {

                const albumName = req.params.albumName;

                const musicList = await this.getAvalibleMusic(albumName);

                if(musicList.length > 0){

                return res.status(200).send({
                        isActionSuccess: true,
                        avalibleMusicList: musicList,
                        message: "Loaded avalible music Succesfully"
                    });
                }

                return res.status(200).send({ // it should be 200? // to remake //temponary
                    isActionSuccess: true,
                    avalibleMusicList: musicList,
                    message: "Empty album or Error"
                });
            })

        return this.app;
    }

    private async loginPost(data:IUsers): Promise<boolean>{

        const { userName, password } = data;

        const isLoginSuccesfull = await authManager.login(userName, password);

        return isLoginSuccesfull;
    }

    private async registerPost(data:IUsers): Promise<boolean>{

        const { userName, password } = data;

        const isRegisteredSuccesfull = await authManager.register(userName, password);

        return isRegisteredSuccesfull;
    }

    private async getAvalibleMusic(albumName:string): Promise<string[]>{
        
        const avalibleMusicList = await fileManager.getMusic(albumName);

        return avalibleMusicList;
    }
}
