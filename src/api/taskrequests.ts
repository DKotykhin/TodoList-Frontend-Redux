import axios from "axios";

import { getToken } from "./getToken";

import { IAddTask, ICompleteTask, ITask, IUpdateTask } from "types/taskTypes";
import { ITaskResponse, ITaskStatusResponse } from "types/responseTypes";

const Base_URL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.baseURL = Base_URL;

export const GetAllTasks = async (): Promise<ITask[]> => {
    const config = {
        method: "GET",
        url: "task",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    };

    const result = await axios(config);
    return result.data;
};

export const AddTask = async (data: IAddTask): Promise<ITaskResponse> => {
    const config = {
        method: "POST",
        url: "task",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    };

    const result = await axios(config);
    return result.data;
};

export const UpdateTask = async (
    data: IUpdateTask | ICompleteTask
): Promise<ITaskStatusResponse> => {
    const config = {
        method: "PATCH",
        url: "task",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    };

    const result = await axios(config);
    return result.data;
};

export const DeleteTask = async (id: {
    _id: string;
}): Promise<ITaskStatusResponse> => {
    const config = {
        method: "DELETE",
        url: "task",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(id),
    };

    const result = await axios(config);
    return result.data;
};
