import { IUser } from "./userTypes";
import { ITask } from "./taskTypes";

export interface IUserResponse extends IUser {    
    token: string;
    message: string; 
}

export interface IUserWithoutTokenResponse extends IUser {    
    message: string; 
}

export interface IUserDeleteResponse {
    status: object;
    message: string;
}

export interface IUserConfirmPasswordResponse {
    status: boolean;
    message: string;
}

export interface ITaskResponse extends ITask {
    message: string;
}

export interface ITaskStatusResponse {
    status: object;
    message: string;
}