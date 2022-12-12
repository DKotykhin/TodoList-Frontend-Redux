import React from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import AddTaskComponent from "components/taskForms/AddTask";
import { getToken } from "api/getToken";

const AddTaskPage: React.FC = () => {

    return getToken() ? (
        <>
            <Helmet>
                <meta name="description" content="Add Task Page" />
                <title>Add Task Page</title>
            </Helmet>
            <AddTaskComponent />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export default AddTaskPage;