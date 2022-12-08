import React from "react";
import Helmet from "react-helmet";
import { Navigate } from "react-router-dom";

import ProfileForm from "components/userProfileList/ProfileForm";
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
            <ProfileForm />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProfilePage;
