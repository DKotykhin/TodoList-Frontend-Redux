import React, { useEffect } from 'react';
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";

import TabPanelComponent from "components/tabPanel/TabPanel";

import { useAppDispatch } from 'store/hook';
import { fetchUserByToken } from "store/userSlice";
import { useAuth } from "hooks/isAuth";
import { RequireAuth } from 'hocs/RequireAuth';

import { getToken } from 'api/getToken';

const HomePage: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAuth();

    useEffect(() => {
        if (!getToken()) {
            navigate("/login")
        } else if (!isAuth) {
            dispatch(fetchUserByToken());
        }
    }, [dispatch, isAuth, navigate]);

    return (
        <>
            <Helmet>
                <meta name="description" content="Home Page" />
                <title>Home Page</title>
            </Helmet>
            <RequireAuth>
                <TabPanelComponent />
            </RequireAuth>
        </>
    )
};

export default HomePage;