import { IUser } from "./userTypes";
import { ITask } from "./taskTypes";

export interface IUserResponse extends IUser {
    message: string;
}

export interface IUserWithTokenResponse extends IUserResponse {
    token: string;
    message: string;
}

export interface IUserConfirmPasswordResponse {
    status: boolean;
    message: string;
}

export interface IUserDeleteResponse {
    userStatus: {
        acknowledged: boolean; 
        deletedCount: number;
    }
    taskStatus: {
        acknowledged: boolean; 
        deletedCount: number;
    };
    message: string;
}

export interface IUserAvatarResponse {
    avatarURL: string;
    message: string;
}

export interface IGetTasksResponse {
    totalTasksQty: number;
    totalPagesQty: number;
    tasksOnPageQty: number;
    tasks: ITask[];
    message: string;
}

export interface IAddTaskResponse extends ITask {
    message: string;
}

export interface ITaskUpdateResponse {
    status: {
        acknowledged: boolean;
        matchedCount: number;
        modifiedCount: number;
    };
    message: string;
}

export interface ITaskDeleteResponse {
    status: {
        acknowledged: boolean;
        deletedCount: number;
    };
    message: string;
}
