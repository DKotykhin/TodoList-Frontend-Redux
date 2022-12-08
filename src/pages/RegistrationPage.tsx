import React from 'react';
import Helmet from "react-helmet";

import RegisterForm from "components/userForms/RegisterForm";

const RegistrationPage: React.FC = () => {
  
  return (
    <>
      <Helmet>
        <meta name="description" content="Registration Page" />
        <title>Registration Page</title>
      </Helmet>
      <RegisterForm />
    </>
  )
}

export default RegistrationPage;