import React from "react";
import Helmet from "react-helmet";

import UpdateTaskComponent from "components/updateTask/UpdateTask";

const UpdateTaskPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Update Task Page" />
                <title>Update Task Page</title>
            </Helmet>
            <UpdateTaskComponent />
        </>
    );
};

export default UpdateTaskPage;
