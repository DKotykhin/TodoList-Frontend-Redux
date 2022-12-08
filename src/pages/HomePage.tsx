import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { useAppDispatch } from 'store/hook';

import TaskList from "components/taskList/TaskList";
import { UserLoginByToken } from "api/userrequests";
import { createUser } from "store/userSlice";
import Spinner from 'components/spinner/Spinner';
import { IUser } from 'types/userTypes';

const HomePage: React.FC = () => {
    const [login, setLogin] = useState(false);    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const localToken = localStorage.getItem("rememberMe");
        const sessionToken = sessionStorage.getItem("rememberMe");
        const token = localToken || sessionToken;
        if (token) {
            UserLoginByToken(token)
                .then((response) => {
                    console.log(response.message);                                        
                    const { avatarURL, createdAt, email, name, _id } = response;
                    const user: IUser = { avatarURL, createdAt, email, name, _id }                    
                    dispatch(createUser({ token, user }));
                    setLogin(true);
                })
                .catch(function (error) {
                    console.warn(error.message);
                    setLogin(false);
                });
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate]);

    return (
        <>
            {login ?
                <>
                    <Helmet>
                        <meta name="description" content="Home Page" />
                        <title>Home Page</title>
                    </Helmet>                    
                    <TaskList />
                </> :
                <Spinner />
            }
        </>
    )
}

export default HomePage;