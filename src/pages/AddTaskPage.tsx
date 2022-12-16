import React from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import AddTaskComponent from "components/taskForms/AddTask";
import { useAuth } from "hooks/isAuth";

const AddTaskPage: React.FC = () => {

    return useAuth() ? (
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