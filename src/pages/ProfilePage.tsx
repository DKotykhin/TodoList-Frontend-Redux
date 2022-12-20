import React from "react";
import Helmet from "react-helmet";

import ProfileList from "components/userProfileList/ProfileList";

const ProfilePage: React.FC = () => {

    return (
        <>
            <Helmet>
                <meta name="description" content="Profile Page" />
                <title>Profile Page</title>
            </Helmet>
            <ProfileList />
        </>
    )
};

export default ProfilePage;
