import axios from 'axios';

import { IUserLogin, IUserRegister, IUserUpdate } from '../types/userTypes';

const Base_URL = process.env.REACT_APP_BACKEND_URL;

axios.defaults.baseURL = Base_URL;

export const RegisterUser = async(data: IUserRegister) => {
    const config = {
        method: 'POST',
        url: 'user/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result.data;
}

export const LoginUser = async(data: IUserLogin) => {
    const config = {
        method: 'POST',
        url: 'user/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result.data;
}

export const UpdateUser = async(data: IUserUpdate, token: string) => {
    const config = {
        method: 'PATCH',
        url: 'user/me',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(data)
    };

    const result = await axios(config);
    return result.data;
}

export const DeleteUser = async(token: string) => {
    const config = {
        method: 'DELETE',
        url: 'user/me',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const result = await axios(config);
    return result.data;
}

export const UserLoginByToken = async(token: string) => {
    const config = {
        method: 'GET',
        url: 'user/me',
        timeout: 8000,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const result = await axios(config);
    return result.data;
}

export const UploadAvatar = async(data: FormData, token: string) => {
    const config = {
        method: 'POST',
        url: 'upload',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: data
    };

    const result = await axios(config);
    return result.data;
}

export const DeleteAvatar = async(data: string, token: string) => {
    const config = {
        method: 'DELETE',
        url: `${data}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    const result = await axios(config);
    return result.data;
}