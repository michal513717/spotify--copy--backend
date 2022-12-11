type ErrorWithMessage = {
    message?: string;
};

export interface IUsers {
    name: string;
    password: string;
    _id: string;
};

export interface IStatus {
    err?: string,
    succes?: string
}