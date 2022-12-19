export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister extends IUserLogin {
    name: string;
}

export interface IUserUpdate {
    [key: string]: string;
}

export interface IUser {
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    avatarURL: string;
    message: string | unknown;
}

export interface IUserAvatar {
    avatarURL: string;
    message: string;
}
