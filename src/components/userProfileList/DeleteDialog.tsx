import React, { useState } from "react";

import { Button, Box, Divider } from "@mui/material";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";

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
        <Box sx={{ textAlign: "center", mt: 2, mb: "100px" }}>
            <Button color="error" variant="outlined" onClick={handleOpen}>
                {buttonTitle}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ border: "2px solid #ff0000" }}>
                    <DialogTitle sx={{ fontSize: "18px", my: 2 }}>
                        {dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can't cancel this action
                        </DialogContentText>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions sx={{ mx: 2 }}>
                        <Button
                            sx={{ color: "#808080" }}
                            onClick={handleClose}
                            autoFocus
                        >
                            Cancel
                        </Button>
                        <Button color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}

export default DeleteDialog;
