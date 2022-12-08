import axios from 'axios'
import { IAddTask, ICompleteTask, IUpdateTask } from 'types/taskTypes';

const Base_URL = process.env.REACT_APP_BACKEND_URL;

axios.defaults.baseURL = Base_URL;

export const GetAllTasks = async(token: string) => {
    const config = {
        method: 'GET',
        url: 'task',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };

    const result = await axios(config);
    return result;
}

export const AddTask = async(data: IAddTask, token: string) => {
    const config = {
        method: 'POST',
        url: 'task',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result;
}

export const UpdateTask = async(data: IUpdateTask | ICompleteTask, token: string) => {
    const config = {
        method: 'PATCH',
        url: 'task',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result;
}

export const DeleteTask = async(id: {_id: string}, token: string) => {
    const config = {
        method: 'DELETE',
        url: 'task',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(id)
    };

    const result = await axios(config);
    return result;
}