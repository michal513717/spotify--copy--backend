import fs from 'fs';
import { IAlbumContent } from '../models';

export default class FileManager {

    private readonly pathAlbum = '\\..\\assets\\music'
    private albumNames:string[] = [];
    private albumContent:IAlbumContent = {};

    constructor() {

        this.initFileManager();
    };

    private initFileManager(){

        this.loadAlbums();
    };

    public getAlbums():string[]{

        return this.albumNames;
    }

    public getMusic():IAlbumContent{
        try{
        
            if(this.albumNames.length > 0){

                
                let albumContent = Object.assign({},...this.albumNames.map(key => ({[key]: []})));
                
                this.albumNames.forEach( albumName => {
                    
                    const contentOfDir = this.loadDir(this.pathAlbum + '\\' + albumName);
                    
                    albumContent[albumName].push(...contentOfDir);
                });
                
                this.albumContent = albumContent;
            }

            return this.albumContent;

        } catch (err) {

            console.log(err);

            return {};
        }
    };

    private loadAlbums():void{
        try{

            this.albumNames = this.loadDir(this.pathAlbum);
        } catch (err) {

            console.log(err);
        }
    };

    private loadDir(path:string): string[] {
        try{

            const dirContent = fs.readdirSync(__dirname + path, { withFileTypes: true })
                .map((file) => file.name);

            return dirContent;

        } catch (err) {

            console.log(err);

            return [];
        }
    }
};