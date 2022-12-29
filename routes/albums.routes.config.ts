import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import { fileManager } from '..';

export class AlbumsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AlbumRoutes');
    }

    configureRoutes(){
            
        this.app.route("/avaliblealbums")
            .get(async (req: express.Request, res: express.Response) => {

                const avalibleAlbums = await this.getAvalibleAlbums();

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

    private async getAvalibleMusic(albumName:string): Promise<string[]>{
        
        const avalibleMusicList = await fileManager.getMusic(albumName);

        return avalibleMusicList;
    }

    private async getAvalibleAlbums(): Promise<string[]>{

        const avalibleAlbums = await fileManager.getAlbums();

        return avalibleAlbums;
    }
}
