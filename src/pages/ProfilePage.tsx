import React from "react";
import Helmet from "react-helmet";
import { Navigate } from "react-router-dom";

import ProfileList from "components/userProfileList/ProfileList";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

const ProfilePage: React.FC = () => {
    const { userdata } = useAppSelector(selectUser);
    
    return userdata.token ? (
        <>
            <Helmet>
                <meta name="description" content="Profile Page" />
                <title>Profile Page</title>
            </Helmet>            
            <ProfileList />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export default ProfilePage;
