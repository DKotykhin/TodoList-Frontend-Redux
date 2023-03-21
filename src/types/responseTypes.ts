import { IUser } from "./userTypes";
import { ITask } from "./taskTypes";

export interface IUserResponse extends IUser {
    message: string;
}

export interface IUserWithTokenResponse extends IUserResponse {
    token: string;
}

export interface IUserConfirmPasswordResponse {
    confirmStatus: boolean;
    message: string;
}

export interface IUserUpdatePasswordResponse {
    updateStatus: boolean;
    message: string;
}

export interface IUserDeleteResponse {
    userStatus: {
        acknowledged: boolean;
        deletedCount: number;
    };
    taskStatus: {
        acknowledged: boolean;
        deletedCount: number;
    };
    message: string;
}

export interface IGetTasksResponse {
    totalTasksQty: number;
    totalPagesQty: number;
    tasksOnPageQty: number;
    tasks: ITask[];
    message: string;
}

export interface ITaskResponse extends ITask {
    message: string;
}

export interface ITaskDeleteResponse {
    taskStatus: {
        acknowledged: boolean;
        deletedCount: number;
    };
    message: string;
}

export interface ITaskStatisticResponse {
    totalTasks: number;
    completedTasks: number;
    activeTasks: number;
    overdueTasks: number;
    message: string;
}
