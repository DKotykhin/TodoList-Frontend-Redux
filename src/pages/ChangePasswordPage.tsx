import React from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import PasswordForm from "components/userAuthForms/PasswordForm";
import { useAuth } from "hooks/isAuth";

const ChangePasswordPage: React.FC = () => {

    return useAuth() ? (
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