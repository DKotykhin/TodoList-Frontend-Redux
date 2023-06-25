import React from 'react';
import Helmet from "react-helmet";

import SetNewPasswordForm from 'components/userAuthForms/SetNewPasswordForm';

const SetNewPasswordPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Set New Password Page" />
                <title>Set New Password Page</title>
            </Helmet>
            <SetNewPasswordForm />
        </>
    )
}

export default SetNewPasswordPage;