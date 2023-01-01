type ErrorWithMessage = {
    message?: string;
};

export interface IUsers {
    userName: string;
    password: string;
    isAdminUser: boolean;
    _id: string;
};

export interface IStatus {
    err?: string,
    succes?: string
}

export interface IError {
    err: string
}

export interface IAlbumContent {
    [key: string]: string[]
}