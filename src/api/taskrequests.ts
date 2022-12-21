import axios from "axios";

import { getToken } from "./getToken";

import { IAddTask, ICompleteTask, IUpdateTask } from "types/taskTypes";
import {
    IAddTaskResponse,
    ITaskResponse,
    ITaskStatusResponse,
} from "types/responseTypes";

const Base_URL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.baseURL = Base_URL;

interface IGetAllTask {
    limit: number;
    page: number
}

export const GetAllTasks = async (queryData: IGetAllTask): Promise<ITaskResponse> => {
    const config = {
        method: "GET",
        url: "/task",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        params: {
            limit: queryData.limit,
            page: queryData.page
        }
    };

    const result = await axios(config);
    return result.data;
};

export const AddTask = async (data: IAddTask): Promise<IAddTaskResponse> => {
    const config = {
        method: "POST",
        url: "/task",
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
        url: "/task",
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
        url: "/task",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(id),
    };

    const result = await axios(config);
    return result.data;
};
