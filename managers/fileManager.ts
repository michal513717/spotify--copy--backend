import fs from 'fs';
import { IAlbumContent } from '../models';
import { audioTypes } from '../utils';

export default class FileManager {

    private readonly pathAlbum = '\\..\\assets\\music'
    private albumNames:string[] = [];
    private albumContent:IAlbumContent = {};

    constructor() {

        this.initFileManager();
    };

    private async initFileManager(){

        this.loadAlbums();
        this.albumContent = await this.loadMusic();
    };

    public getAlbums():string[]{

        return this.albumNames;
    }

    public getMusic(albumName:string):string[]{

        if(this.albumContent[albumName] !== undefined) {
            return this.albumContent[albumName];
        } else{ 
            return [];
        }
    }

    private loadMusic():IAlbumContent{
        try{
        
            if(this.albumNames.length > 0){

                
                let albumContent = Object.assign({},...this.albumNames.map(key => ({[key]: []})));
                
                this.albumNames.forEach( albumName => {
                    
                    const contentOfDir = this.loadDir(this.pathAlbum + '\\' + albumName);

                    const filteredFiles = this.removeNonAudioFiles(contentOfDir);
                    
                    albumContent[albumName].push(...filteredFiles);
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

    private removeNonAudioFiles(files:string[]):string[]{

        const filteredFiles = files.filter((item:string) => {

            const extension = item.split('.').pop() as string;
            
            return audioTypes.includes(extension)
        });

        return filteredFiles;
    }
};