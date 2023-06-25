import { createBrowserRouter } from "react-router-dom";

import Layout from "components/layout/Layout";
import { RequireAuth } from "hocs/RequireAuth";

import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegistrationPage from "pages/RegistrationPage";
import ProfilePage from "pages/ProfilePage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import SetNewPasswordPage from "pages/SetNewPasswordPage";
import ChangePasswordPage from "pages/ChangePasswordPage";
import AddTaskPage from "pages/AddTaskPage";
import UpdateTaskPage from "pages/UpdateTaskPage";
import Page404 from "pages/Page404";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <Page404 />,
        children: [
            {
                path: '/',
                element: <RequireAuth children={<HomePage />} />,
            },
            {
                path: 'registration',
                element: <RegistrationPage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'reset',
                element: <ResetPasswordPage />,
            },
            {
                path: 'auth/reset/:token',
                element: <SetNewPasswordPage />,
            },
            {
                path: 'profile',
                element: <RequireAuth children={<ProfilePage />} />,
            },
            {
                path: 'password',
                element: <RequireAuth children={<ChangePasswordPage />} />,
            },
            {
                path: 'addtask',
                element: <RequireAuth children={<AddTaskPage />} />,
            },
            {
                path: 'updatetask/:taskId',
                element: <RequireAuth children={<UpdateTaskPage />} />,
            },
        ],
    },
]);
