import React, { useState } from "react";

import { Button, Box, Divider } from "@mui/material";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";

import './deleteDialog.scss';

interface IDeleteDialog {
    buttonTitle: string;
    dialogTitle: string;
    deleteAction: () => void
}

const DeleteDialog: React.FC<IDeleteDialog> = ({ buttonTitle, dialogTitle, deleteAction }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);
        deleteAction();
    };

    return (
        <Box className="dialog">
            <Button
                className="dialog button"
                color="error"
                variant="outlined"
                onClick={handleOpen}
            >
                {buttonTitle}
            </Button>
            <Dialog
                className="modal"
                open={open}
                onClose={handleClose}
            >
                <Box className="modal box">
                    <DialogTitle className="modal title">
                        {dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can't cancel this action
                        </DialogContentText>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions className="modal actions">
                        <Button
                            className="modal cancel_button"
                            onClick={handleClose}
                            autoFocus
                        >
                            Cancel
                        </Button>
                        <Button
                            className="modal submit_button"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}

export default DeleteDialog;
