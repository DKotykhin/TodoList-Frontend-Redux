import React from "react";
import Helmet from "react-helmet";
import { Navigate } from "react-router-dom";

import ProfileList from "components/userProfileList/ProfileList";
import { getToken } from "api/getToken";

const ProfilePage: React.FC = () => {
     
    return getToken() ? (
        <>
            <Helmet>
                <meta name="description" content="Profile Page" />
                <title>Profile Page</title>
            </Helmet>            
            <ProfileList />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProfilePage;
