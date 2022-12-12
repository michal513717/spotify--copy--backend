type ErrorWithMessage = {
    message?: string;
};

export interface IUsers {
    userName: string;
    password: string;
    _id: string;
};

export interface IStatus {
    err?: string,
    succes?: string
}

export interface IError {
    err: string
}