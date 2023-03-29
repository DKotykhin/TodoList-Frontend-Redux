import React from 'react';
import Helmet from "react-helmet";

import HomePageList from "components/homePageList/HomePageList";

const HomePage: React.FC = () => {

    return (
        <>
            <Helmet>
                <meta name="description" content="Home Page" />
                <title>Home Page</title>
            </Helmet>
            <HomePageList />
        </>
    )
};

export default HomePage;