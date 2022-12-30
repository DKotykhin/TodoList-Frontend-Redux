import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

import { useAppDispatch } from 'store/hook';
import { fetchUserByToken } from "store/userSlice";
import { useAuth } from "hooks/isAuth";

const theme = createTheme({
    palette: {
        primary: {
            main: "#00a1b6",
        },
    },
});

const ReqAuth = (element: JSX.Element): JSX.Element => {
    return (
        <RequireAuth>{element}</RequireAuth>
    )
};


const App = () => {

    const dispatch = useAppDispatch();
    const isAuth = useAuth();

    useEffect(() => {
        if (!isAuth) {
            dispatch(fetchUserByToken());
        }
    }, [dispatch, isAuth]);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Routes>
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
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
