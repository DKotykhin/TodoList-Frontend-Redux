import React from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import UpdateTaskComponent from "components/taskForms/UpdateTask";
import { getToken } from "api/getToken";

const UpdateTaskPage: React.FC = () => {
    
    return getToken() ? (
        <>
            <Helmet>
                <meta name="description" content="Update Task Page" />
                <title>Update Task Page</title>
            </Helmet>
            <UpdateTaskComponent />
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default UpdateTaskPage;
