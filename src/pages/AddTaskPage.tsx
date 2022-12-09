import React from "react";
import { Navigate } from "react-router-dom";
import Helmet from "react-helmet";

import AddTaskComponent from "components/taskForms/AddTask";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

const AddTaskPage: React.FC = () => {
    const { userdata } = useAppSelector(selectUser);

    return userdata.token ? (
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