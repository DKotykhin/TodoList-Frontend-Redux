import React from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import UpdateTaskComponent from "components/taskForms/UpdateTask";
import { useAuth } from "hooks/isAuth";

const UpdateTaskPage: React.FC = () => {

    return useAuth() ? (
        <>
            <Helmet>
                <meta name="description" content="Update Task Page" />
                <title>Update Task Page</title>
            </Helmet>
            <UpdateTaskComponent />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export default UpdateTaskPage;
