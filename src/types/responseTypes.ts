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

export interface IUserAvatarResponse {
    avatarURL: string;
    message: string;
}

export interface IAddTaskResponse extends ITask {
    message: string;
}

export interface ITaskResponse {
    totalTasksQty: number;
    totalPagesQty: number;
    tasksOnPageQty: number;
    tasks: ITask[];
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
