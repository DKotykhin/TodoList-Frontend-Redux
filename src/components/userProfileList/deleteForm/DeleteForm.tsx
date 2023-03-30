import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Typography, Paper } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ChildModal from "components/childModal/ChildModal";

import User from "api/userrequests";
import { removeUser } from "store/userSlice";
import { useAppDispatch } from "store/reduxHooks";

import styles from "./deleteForm.module.scss";

const DeleteForm: React.FC = () => {

    const [deleting, setDeleting] = useState(false);
    const [openChildModal, setOpenChildModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (): void => {
        setDeleting(true);
        setOpenChildModal(false);
        User.DeleteUser()
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

    const handleClick = (): void => {
        setOpenChildModal(true);
    };
    const handleClose = (): void => {
        setOpenChildModal(false);
    };

    return (
        <Paper elevation={10} className={styles.deleteForm}>
            <Typography className={styles.deleteForm__title}>
                {deleting ? 'Deleting...' : 'Need to delete Profile?'}
            </Typography>
            <DeleteForeverIcon onClick={handleClick} className={styles.deleteForm__icon} />
            <ChildModal
                open={openChildModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                title={'user'}
            />
        </Paper>
    )
}

export default DeleteForm;