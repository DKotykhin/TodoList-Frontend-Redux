import React from "react";
import Helmet from "react-helmet";

import AddTaskComponent from "components/addTask/AddTask";

const AddTaskPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Add Task Page" />
                <title>Add Task Page</title>
            </Helmet>
            <AddTaskComponent />
        </>
    );
};

export default AddTaskPage;