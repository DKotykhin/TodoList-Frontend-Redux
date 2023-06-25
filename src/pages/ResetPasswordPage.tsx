import React from 'react';
import Helmet from "react-helmet";

import ResetPasswordForm from 'components/userAuthForms/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Reset Password Page" />
                <title>Reset Password Page</title>
            </Helmet>
            <ResetPasswordForm />
        </>
    )
}

export default ResetPasswordPage;