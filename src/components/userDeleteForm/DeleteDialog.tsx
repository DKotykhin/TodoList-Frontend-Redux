import React, { useState } from "react";

import { Button, Box, Divider, IconButton, Tooltip } from "@mui/material";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './deleteDialog.scss';

interface IDeleteDialog {    
    dialogTitle: string;
    deleteAction: () => void
}

const DeleteDialog: React.FC<IDeleteDialog> = ({ dialogTitle, deleteAction }) => {
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
            <IconButton onClick={handleOpen}>
                <Tooltip title="Delete" placement="left" arrow>
                    <DeleteForeverIcon color="error" />
                </Tooltip>
            </IconButton>
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
