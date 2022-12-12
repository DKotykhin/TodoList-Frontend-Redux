import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { useAppDispatch } from 'store/hook';

import TabPanelComponent from "components/tabPanel/TabPanel";
import Spinner from 'components/spinner/Spinner';

import { UserLoginByToken } from "api/userrequests";
import { getToken } from 'api/getToken';
import { createUser } from "store/userSlice";
import { IUser } from 'types/userTypes';

const HomePage: React.FC = () => {
    const [login, setLogin] = useState(false);    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {        
        const token = getToken();
        if (token) {
            UserLoginByToken()
                .then(response => {
                    console.log(response.message);                                        
                    const { avatarURL, createdAt, email, name, _id } = response;
                    const user: IUser = { avatarURL, createdAt, email, name, _id }                    
                    dispatch(createUser({ user }));
                    setLogin(true);
                })
                .catch(error => {
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
                    <TabPanelComponent />
                </> :
                <Spinner />
            }
        </>
    )
}

export default HomePage;