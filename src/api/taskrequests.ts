import axios from "axios";

import { getToken } from "./getToken";

import {
    IAddTask,
    ICompleteTask,
    IQueryData,
    IUpdateTask,
} from "types/taskTypes";
import {    
    IGetTasksResponse,
    ITaskDeleteResponse,
    ITaskResponse,    
} from "types/responseTypes";

const Base_URL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.baseURL = Base_URL;

export const GetAllTasks = async (
    queryData: IQueryData
): Promise<IGetTasksResponse> => {
    const config = {
        method: "GET",
        url: "/task",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        params: {
            limit: queryData.limit,
            page: queryData.page,
            tabKey: queryData.tabKey,
            sortField: queryData.sortField,
            sortOrder: queryData.sortOrder,
            search: queryData.search,
        },
    };

    const result = await axios(config);
    return result.data;
};

export const AddTask = async (data: IAddTask): Promise<ITaskResponse> => {
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
): Promise<ITaskResponse> => {
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
}): Promise<ITaskDeleteResponse> => {
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
