import React from "react";
import Helmet from "react-helmet";

import PasswordForm from "components/userAuthForms/passwordForm/PasswordForm";

const ChangePasswordPage: React.FC = () => {

    return (
        <>
            <Helmet>
                <meta name="description" content="Change Password Page" />
                <title>Change Password Page</title>
            </Helmet>
            <PasswordForm />
        </>
    )
}

export default ChangePasswordPage;