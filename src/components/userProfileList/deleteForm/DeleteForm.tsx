import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Typography, Paper } from "@mui/material";

import DeleteDialog from "../deleteDialog/DeleteDialog";

import { DeleteUser } from "api/userrequests";
import { removeUser } from "store/userSlice";
import { useAppDispatch } from "store/reduxHooks";

import styles from "./deleteForm.module.scss";

const DeleteForm: React.FC = () => {

    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDelete = (): void => {
        DeleteUser()
            .then((response) => {
                console.log(response.message);
                sessionStorage.removeItem("rememberMe");
                localStorage.removeItem("rememberMe");
                dispatch(removeUser());
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error.response.data.message || error.message);
            })
            .finally(() => {
                setDeleting(false);
            });
    };

    return (
        <Paper elevation={10} className={styles.deleteForm}>
            <Typography className={styles.deleteForm__title}>
                {deleting ? 'Deleting...' : 'Need to delete Profile?'}
            </Typography>
            <DeleteDialog
                dialogTitle={"You really want to delete user?"}
                deleteAction={handleDelete}
            />
        </Paper>
    )
}

export default DeleteForm;