import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { DeleteTask, UpdateTask } from "api/taskrequests";
import { removeTask, updateTaskCompleted } from "store/taskSlice";
import { selectUser } from "store/selectors";
import { ICompleteTask, ITask } from "types/taskTypes";

interface IFullCardButtons {
    task: ITask;
    deleteLoading: (arg0: boolean) => void;
    closeModal: () => void 
}

const FullCardButtons: React.FC<IFullCardButtons> = ({ task, deleteLoading, closeModal }) => {
    const { _id, completed } = task;
    const [completeLoading, setCompleteLoading] = useState(false);

    const { userdata } = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        deleteLoading(true);
        closeModal();
        DeleteTask({ _id: id }, userdata.token)
            .then(function (response) {
                console.log(response.data.message);
                dispatch(removeTask(id));
                deleteLoading(false);
            })
            .catch(function (error) {
                console.warn(error.message);
                alert("Delete Error");
            });
    };

    const handleUpdate = (id: string) => {
        navigate(`/updatetask/${id}`);
    };

    const handleComplete = (data: ITask) => {
        setCompleteLoading(true);
        const newData: ICompleteTask = { completed: !data.completed, _id: data._id };
        UpdateTask(newData, userdata.token)
            .then(function (response) {
                console.log(response.data.message);
                dispatch(updateTaskCompleted(data._id));
                setCompleteLoading(false);
            })
            .catch(function (error) {
                console.warn(error.message);
                alert("Complete Error");
            });
    };

    
    return (
        <>
            <Button
                size="small"
                color="error"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </Button>
            <Button
                size="small"
                color="inherit"
                onClick={() => handleUpdate(_id)}
            >
                Update
            </Button>
            <Button size="small" onClick={() => handleComplete(task)}>
                {completeLoading
                    ? "Loading..."
                    : completed
                    ? "Undo Complete"
                    : "Complete"}
            </Button>
        </>
    );
};

export default FullCardButtons;
