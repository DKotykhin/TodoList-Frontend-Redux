import { createBrowserRouter } from "react-router-dom";

import Layout from "components/layout/Layout";
import { RequireAuth } from "hocs/RequireAuth";

import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import RegistrationPage from "pages/RegistrationPage";
import Page404 from "pages/Page404";
import ChangePasswordPage from "pages/ChangePasswordPage";
import UpdateTask from "pages/UpdateTaskPage";
import AddTask from "pages/AddTaskPage";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <Page404/>,
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
                path: 'profile',
                element: <RequireAuth children={<ProfilePage />} />,
            },
            {
                path: 'password',
                element: <RequireAuth children={<ChangePasswordPage />} />,
            },
            {
                path: 'addtask',
                element: <RequireAuth children={<AddTask />} />,
            },
            {
                path: 'updatetask/:taskId',
                element: <RequireAuth children={<UpdateTask />} />,
            },            
        ],
    },
]);
