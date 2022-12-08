import React from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import PasswordForm from "components/userForms/PasswordForm";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

const ChangePasswordPage: React.FC = () => {    
    const { userdata } = useAppSelector(selectUser);
 
    return userdata.token ? (
        <>
            <Helmet>
                <meta name="description" content="Change Password Page" />
                <title>Change Password Page</title>
            </Helmet>            
            <PasswordForm />
        </>
    ) : (
        <Navigate to="/" />
    );
}

export default ChangePasswordPage;