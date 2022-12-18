import React from "react";
import Helmet from "react-helmet";
import { Navigate } from "react-router-dom";

import ProfileList from "components/userProfileList/ProfileList";
import { useAuth } from "hooks/isAuth";

const ProfilePage: React.FC = () => {

    return useAuth() ? (
        <>
            <Helmet>
                <meta name="description" content="Profile Page" />
                <title>Profile Page</title>
            </Helmet>
            <ProfileList />
        </>
    ) : <Navigate to="/" />
};

export default ProfilePage;
