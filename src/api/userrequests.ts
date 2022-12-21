import axios from "axios";

import { getToken } from "./getToken";

import { IUserRegister, IUserLogin, IUserUpdate } from "../types/userTypes";

import {
    IUserResponse,
    IUserDeleteResponse,
    IUserWithoutTokenResponse,
    IUserConfirmPasswordResponse,
    IUserAvatarResponse,
} from "types/responseTypes";

const Base_URL = process.env.REACT_APP_BACKEND_URL;

axios.defaults.baseURL = Base_URL;

export const RegisterUser = async (
    data: IUserRegister
): Promise<IUserResponse> => {
    const config = {
        method: "POST",
        url: "/user/register",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    };

    const result = await axios(config);
    return result.data;
};

export const LoginUser = async (data: IUserLogin): Promise<IUserResponse> => {
    const config = {
        method: "POST",
        url: "/user/login",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
    };

    const result = await axios(config);
    return result.data;
};

export const UpdateUser = async (data: IUserUpdate): Promise<IUserResponse> => {
    const config = {
        method: "PATCH",
        url: "/user/me",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        data: JSON.stringify(data),
    };

    const result = await axios(config);
    return result.data;
};

export const DeleteUser = async (): Promise<IUserDeleteResponse> => {
    const config = {
        method: "DELETE",
        url: "/user/me",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    };

    const result = await axios(config);
    return result.data;
};

export const LoginUserByToken =
    async (): Promise<IUserWithoutTokenResponse> => {
        const config = {
            method: "GET",
            url: "/user/me",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        };

        const result = await axios(config);
        return result.data;
    };

export const UserConfirmPassword = async (data: {
    password: string;
}): Promise<IUserConfirmPasswordResponse> => {
    const config = {
        method: "POST",
        url: "/user/password",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        data: JSON.stringify(data),
    };

    const result = await axios(config);
    return result.data;
};

export const UploadAvatar = async (
    data: FormData
): Promise<IUserAvatarResponse> => {
    const config = {
        method: "POST",
        url: "/upload",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
        },
        data: data,
    };

    const result = await axios(config);
    return result.data;
};

export const DeleteAvatar = async (): Promise<IUserAvatarResponse> => {
    const config = {
        method: "DELETE",
        url: "/upload",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    };

    const result = await axios(config);
    return result.data;
};
