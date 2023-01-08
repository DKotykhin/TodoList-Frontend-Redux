import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Typography, Paper } from "@mui/material";

import DeleteDialog from "./DeleteDialog";

import { DeleteUser } from "api/userrequests";
import { removeUser } from "store/userSlice";
import { useAppDispatch } from "store/hook";

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
        <Paper elevation={10} sx={{ border: '2px solid #ff0000' }}>
            <Typography className="profile subtitle">
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