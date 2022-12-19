import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Layout from "components/layout/Layout";

import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import RegistrationPage from "pages/RegistrationPage";
import Page404 from "pages/Page404";
import ChangePasswordPage from "pages/ChangePasswordPage";
import UpdateTask from "pages/UpdateTaskPage";
import AddTask from "pages/AddTaskPage";

const theme = createTheme({
    palette: {
        primary: {
            main: "#00a1b6",
        },
    },
});


const App = () => {

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/updatetask/:taskId" element={<UpdateTask />} />
                        <Route path="/addtask" element={<AddTask />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="registration" element={<RegistrationPage />} />
                        <Route path="password" element={<ChangePasswordPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
