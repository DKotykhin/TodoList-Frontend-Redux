import React from 'react';
import Helmet from "react-helmet";

import TabPanelComponent from "components/tabs/TabPanel";

const HomePage: React.FC = () => {

    return (
        <>
            <Helmet>
                <meta name="description" content="Home Page" />
                <title>Home Page</title>
            </Helmet>
            <TabPanelComponent />
        </>
    )
};

export default HomePage;