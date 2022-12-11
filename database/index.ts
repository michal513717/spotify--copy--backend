import { IUsers } from "../models";
import { getErrorMessage } from "../utils";

var Datastore = require('nedb')

class Database {
    usersDB: any;
    usersData: any;

    constructor(){

        this.loadDataBase();
    }

    public getData(){

        //currently return users
        return this.usersData;
    }

    private loadDataBase(): void{

        this.usersDB = new Datastore({filename: './data/users.db', autoload: true})
        this.insert();
        this.loadAllData();
    }

    private insert(): void{

        var doc = {
            name: "aaa",
            pass: "aaa"
        };
        var doc2 = {
            name: "bbb",
            pass: "bbb"
        };
        var doc3 = {
            name: "ccc",
            pass: "ccc"
        };
        var doc4 = {
            name: "ddd",
            pass: "ddd"
        };

        this.usersDB.insert(doc);
        this.usersDB.insert(doc2)
        this.usersDB.insert(doc3)
        this.usersDB.insert(doc4)
    }

    private loadAllData(): void{

        this.usersDB.find({},  (err:any, docs:any) => {
            console.log(docs);
            this.usersData = JSON.stringify({docs}, null, 5);
        })
    }
    
}

export const database = new Database();