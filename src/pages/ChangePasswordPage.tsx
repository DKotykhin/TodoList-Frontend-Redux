import React from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import PasswordForm from "components/userAuthForms/PasswordForm";
import { getToken } from "api/getToken";

const ChangePasswordPage: React.FC = () => {

    return getToken() ? (
        <>
            <Helmet>
                <meta name="description" content="Change Password Page" />
                <title>Change Password Page</title>
            </Helmet>
            <PasswordForm />
        </>
    ) : (
        <Navigate to="/login" />
    );
}

export default ChangePasswordPage;