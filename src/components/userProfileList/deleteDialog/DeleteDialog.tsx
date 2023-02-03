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

import styles from './deleteDialog.module.scss';

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
        <>            
            <IconButton onClick={handleOpen}>
                <Tooltip title="Delete" placement="left" arrow>
                    <DeleteForeverIcon color="error" />
                </Tooltip>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Box className={styles.modal__box}>
                    <DialogTitle className={styles.modal__title}>
                        {dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can't cancel this action
                        </DialogContentText>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions className={styles.modal__actions}>
                        <Button
                            className={styles.modal__cancel_button}
                            onClick={handleClose}
                            autoFocus
                        >
                            Cancel
                        </Button>
                        <Button
                            className={styles.modal__submit_button}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}

export default DeleteDialog;
