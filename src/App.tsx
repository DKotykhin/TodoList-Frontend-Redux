import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

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


const ReqAuth = (element: JSX.Element): JSX.Element => {
    return (
        <RequireAuth>{element}</RequireAuth>
    )
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={ReqAuth(<HomePage />)} />
            <Route path="/addtask" element={ReqAuth(<AddTask />)} />
            <Route path="/updatetask/:taskId" element={ReqAuth(<UpdateTask />)} />
            <Route path="profile" element={ReqAuth(<ProfilePage />)} />
            <Route path="password" element={ReqAuth(<ChangePasswordPage />)} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Page404 />} />
        </Route>
    )
);

