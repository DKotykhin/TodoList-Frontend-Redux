import React, { useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import TabPanelComponent from "components/tabPanel/TabPanel";
import Spinner from 'components/spinner/Spinner';

import { getToken } from 'api/getToken';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchUser } from "store/userSlice";
import { selectUser } from 'store/selectors';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { fetching, error } = useAppSelector(selectUser);
    const isLoaded = fetching === "loaded";
    const isError = fetching === "error";
    error && console.log(error);

    useEffect(() => {
        const token = getToken();
        if (token) {
            dispatch(fetchUser())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate]);

    return (
        <>
            {isLoaded ?
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