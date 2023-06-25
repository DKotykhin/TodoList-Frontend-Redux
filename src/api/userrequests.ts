import axios from "axios";

import { getToken } from "./getToken";

import {
    IUserRegister,
    IUserLogin,
    IUserUpdateName,
    IUserUpdatePassword,
    IUserAvatar,
} from "../types/userTypes";

import {
    IUserResponse,
    IUserDeleteResponse,
    IUserWithTokenResponse,
    IUserConfirmPasswordResponse,
    IUserUpdatePasswordResponse,
    ITaskStatisticResponse,
    IUserResetPasswordResponse,
} from "types/responseTypes";

const Base_URL = process.env.REACT_APP_BACKEND_URL;

axios.defaults.baseURL = Base_URL;

class User {
    async RegisterUser(data: IUserRegister): Promise<IUserWithTokenResponse> {
        const config = {
            method: "POST",
            url: "/auth/register",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        };

        const result = await axios(config);
        return result.data;
    }

    LoginUser = async (data: IUserLogin): Promise<IUserWithTokenResponse> => {
        const config = {
            method: "POST",
            url: "/auth/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        };

        const result = await axios(config);
        return result.data;
    };

    LoginUserByToken = async (): Promise<IUserResponse> => {
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

    UpdateUserName = async (data: IUserUpdateName): Promise<IUserResponse> => {
        const config = {
            method: "PATCH",
            url: "/user/name",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            data: JSON.stringify(data),
        };

        const result = await axios(config);
        return result.data;
    };

    UpdateUserPassword = async (
        data: IUserUpdatePassword
    ): Promise<IUserUpdatePasswordResponse> => {
        const config = {
            method: "PATCH",
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

    UserConfirmPassword = async (data: {
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

    UserResetPassword = async (data: {
        email: string;
    }): Promise<IUserResetPasswordResponse> => {
        const config = {
            method: "POST",
            url: "/auth/reset",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        };

        const result = await axios(config);
        return result.data;
    };

    UserSetNewPassword = async (data: {
        password: string;
        token: string | undefined;
    }): Promise<IUserUpdatePasswordResponse> => {
        const config = {
            method: "PATCH",
            url: "/auth/reset",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        };

        const result = await axios(config);
        return result.data;
    };

    DeleteUser = async (): Promise<IUserDeleteResponse> => {
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

    UploadAvatar = async (data: FormData): Promise<IUserAvatar> => {
        const config = {
            method: "POST",
            url: "/avatar",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getToken()}`,
            },
            data: data,
        };

        const result = await axios(config);
        return result.data;
    };

    DeleteAvatar = async (): Promise<IUserAvatar> => {
        const config = {
            method: "DELETE",
            url: "/avatar",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        };

        const result = await axios(config);
        return result.data;
    };

    GetTasksStatistic = async (): Promise<ITaskStatisticResponse> => {
        const config = {
            method: "GET",
            url: "/user/statistic",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        };

        const result = await axios(config);
        return result.data;
    };
}

export default new User();
