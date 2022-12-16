import React, { useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import TabPanelComponent from "components/tabPanel/TabPanel";
import Spinner from 'components/spinner/Spinner';

import { getToken } from 'api/getToken';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchUser } from "store/userSlice";
import { selectUser } from 'store/selectors';
import { useAuth } from "hooks/isAuth";
import { useError } from 'hooks/isError';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuth = useAuth();
    const isError = useError();

    const { error } = useAppSelector(selectUser);
    error && console.log(error);

    useEffect(() => {
        if (!isAuth) {
            const token = getToken();
            if (token) {
                dispatch(fetchUser());
            } else {
                navigate('/login')
            }
        }
    }, [dispatch, isAuth, navigate]);

    return (
        <>
            {isAuth ?
                <>
                    <Helmet>
                        <meta name="description" content="Home Page" />
                        <title>Home Page</title>
                    </Helmet>
                    <TabPanelComponent />
                </>
                : isError ? <Navigate to="/login" /> : <Spinner />
            }
        </>
    )
}

export default HomePage;