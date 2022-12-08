import React from 'react';
import Helmet from "react-helmet";

import LoginForm from "components/userForms/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Login Page" />
        <title>Login Page</title>
      </Helmet>
      <LoginForm />
    </>
  )
}

export default LoginPage;