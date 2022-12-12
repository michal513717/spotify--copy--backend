import { databaseManager } from ".."
import { IError, IUsers } from "../models";

export default class AuthManager {
    private users!: IUsers[];
    private isDatabaseExist: boolean = false;
    private readonly databaseName = 'users';

    constructor(){

        this.initialDatabaseUsers()
    }

    private async initialDatabaseUsers (){

        const users = await databaseManager.getData<IError|IUsers[]>(this.databaseName);

        if( (users as IError).err ){

            this.isDatabaseExist = false;
            
            return { err: 'Error during loading database' };
        }

        this.isDatabaseExist = true;
        this.users = users as IUsers[];

        console.log(this.users);
        console.log(this.login('aaa','aaa'))
        console.log(this.register('aaaa','aaaaaaaaaaaa'))
    }

    private login( userName: string, password:string ): boolean{

        const isLoginSuccesfull = this.isExistUserWithUserNameAndPassword(userName, password);

        if( isLoginSuccesfull === true ){

            return true;
        }

        return false;
    }

    private register( userName: string, password:string ): boolean {

        const isExistUserWithUserName = this.isExistUserWithUserName(userName);

        if( isExistUserWithUserName === true ) {
            return false;
        }

        const isPasswordValid = this.validPassword(password);

        if( isPasswordValid === false ) {

            return false
        }

        this.addUserToDatabase(userName, password);

        return true;
    }

    private isExistUserWithUserName(checkingName:string): boolean { // to rename
 
        if (this.users.some((user:IUsers) => user.userName === checkingName)) {

            return true;
        }

        return false;
    }

    private isExistUserWithUserNameAndPassword(userName:string, password:string): boolean { // to rename

        if (this.users.some((user:IUsers) => (user.userName === userName && user.password === password ))) {

            return true;
        }

        return false;
    }

    private validPassword(password:string): boolean {

        if(password.length <= 8){

            return false
        }

        return true;
    }

    private addUserToDatabase(userName: string, password: string): boolean{
        try{

            const userData = { userName, password };

            databaseManager.insert(this.databaseName, userData);

            return true;
        } catch(err){

            console.log(err);
            return false;
        }
    }
};