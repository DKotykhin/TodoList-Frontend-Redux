import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import { useAppDispatch, useAppSelector } from 'store/hook';

import TabPanelComponent from "components/tabPanel/TabPanel";
import Spinner from 'components/spinner/Spinner';

import { getToken } from 'api/getToken';
import { fetchUser } from "store/userSlice";
import { selectUser } from 'store/selectors';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { fetching } = useAppSelector(selectUser);
    const isLoaded = fetching === "loaded";

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
                </> :
                <Spinner />
            }
        </>
    )
}

export default HomePage;