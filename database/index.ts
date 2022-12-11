import { IStatus } from "../models";

var Datastore = require('nedb')

export default class DatabaseManager {
    usersDB: any;
    usersData: any;
    allCollections: any;

    constructor(){

        this.allCollections = { users: this.usersDB };
        this.initialDatabase();
    }

    public getData(dataBaseName: string): object{

        const isDatabaseExist = this.checkDatabaseName(dataBaseName);

        if( isDatabaseExist === false ){

            return {err: 'Invalid Database Name'};
        }
        
        return this.loadFromCollection(dataBaseName);
    }

    private initialDatabase(): void{

        const usersDB = new Datastore({filename: './database/data/users.db', autoload: true});
        
        this.allCollections = { 
            users: usersDB,
        };

        this.loadFromCollection('users');
    }

    private insert<T = {}>(dataBaseName:string, data:T): IStatus{

        const isDatabaseExist = this.checkDatabaseName(dataBaseName);

        if( isDatabaseExist === false){

            return {err: 'Invalid Database Name'};
        }

        const dataBase = this.allCollections[dataBaseName];

        dataBase.insert(data, (err:any, doc:any) => {

            if(err){
                return {err: 'Error during saving'};
            }
        })

        return { succes: 'Success insert' }
    }

    private loadFromCollection(dataBaseName:string){

        return new Promise ((resolve, reject) => {

            const isDatabaseExist = this.checkDatabaseName(dataBaseName);

            if( isDatabaseExist === false ){
                
                reject({ err:'Invalid Database Name' });
            }

            const dataBase = this.allCollections[dataBaseName];

            dataBase.find({}, <T>(err:any, docs:T) => {
                if(err){
                    reject(err);
                }

                resolve(docs);
            });
        })
    }

    private checkDatabaseName(databaseName: string): boolean {

        const keys:string[] = Object.keys(this.allCollections);
        
        if(keys.includes(databaseName) !== false) {
            return true;
        }

        return false;
    }
}