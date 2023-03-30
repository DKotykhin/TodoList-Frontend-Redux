import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Button } from "@mui/material";

import ChildModal from "components/childModal/ChildModal";

import Task from "api/taskrequests";
import { fetchTasks } from "store/taskSlice";
import { useAppDispatch, useAppSelector } from "store/reduxHooks";
import { selectQuery } from "store/selectors";

import { ICompleteTask, ITask } from "types/taskTypes";

interface IFullCardButtons {
    task: ITask;
    closeModal: () => void;
}

const FullCardButtons: React.FC<IFullCardButtons> = ({ task, closeModal }) => {
    const { _id, completed } = task;

    const [completeLoading, setCompleteLoading] = useState(false);
    const [openChildModal, setOpenChildModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { query } = useAppSelector(selectQuery);
    const { limit, page, tabKey, sortField, sortOrder, search } = query;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleDelete = (_id: string): void => {
        setOpenChildModal(true);
    };

    const handleUpdate = (id: string): void => {
        if (!task.completed) {
            navigate(`/updatetask/${id}`);
        } else toast.warn("You can't update completed task!");
    };

    const handleComplete = (data: ITask) => {
        setCompleteLoading(true);
        closeModal();
        const { completed, _id, title } = data;
        const newData: ICompleteTask = { completed: !completed, _id, title };
        Task.UpdateTask(newData)
            .then(response => {
                toast.success(response.message);
                dispatch(fetchTasks({ limit, page, tabKey, sortField, sortOrder, search }));
            })
            .catch((error) => {
                toast.error(error.response.data.message || error.message);
            })
            .finally(() => setCompleteLoading(false));
    };

    const handleClose = (): void => {
        setOpenChildModal(false);
    };
    const handleSubmit = (): void => {
        setDeleteLoading(true);
        setOpenChildModal(false);
        Task.DeleteTask({ _id })
            .then(response => {
                closeModal();
                toast.success(response.message);
                dispatch(fetchTasks({ limit, page, tabKey, sortField, sortOrder, search }));
            })
            .catch(error => toast.error(error.response.data.message || error.message))
            .finally(() => setDeleteLoading(false));
    };

    return (
        <>
            <Button
                size="small"
                color="error"
                onClick={() => handleDelete(_id)}
            >
                {
                    deleteLoading ? 'Loading...' : 'Delete'
                }
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
            <ChildModal
                open={openChildModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                title={'task'}
            />
        </>
    );
};

export default FullCardButtons;
