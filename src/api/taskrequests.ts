import axios from "axios";
import {
    IAddTask,
    ICompleteTask,
    ITask,
    ITaskResponse,
    ITaskResponseStatus,
    IUpdateTask,
} from "types/taskTypes";

const Base_URL = process.env.REACT_APP_BACKEND_URL;

axios.defaults.baseURL = Base_URL;

export const GetAllTasks = async (token: string): Promise<ITask[]> => {
    const config = {
        method: "GET",
        url: "task",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const result = await axios(config);
    return result.data;
};

export const AddTask = async (
    data: IAddTask,
    token: string
): Promise<ITaskResponse> => {
    const config = {
        method: "POST",
        url: "task",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    };

    const result = await axios(config);
    return result.data;
};

export const UpdateTask = async (
    data: IUpdateTask | ICompleteTask,
    token: string
): Promise<ITaskResponseStatus> => {
    const config = {
        method: "PATCH",
        url: "task",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    };

    const result = await axios(config);
    return result.data;
};

export const DeleteTask = async (
    id: { _id: string },
    token: string
): Promise<ITaskResponseStatus> => {
    const config = {
        method: "DELETE",
        url: "task",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(id),
    };

    const result = await axios(config);
    return result.data;
};
