import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface ISnackBar {
    successMessage: string;
    errorMessage: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar: React.FC<ISnackBar> = ({ successMessage, errorMessage }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (successMessage || errorMessage) {
            setOpen(true);
        }
    }, [errorMessage, successMessage]);

    const handleClose = (event: React.SyntheticEvent | Event) => {
        setOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}            
            action={action}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            {errorMessage
                ?
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
                :
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            }
        </Snackbar>
    );
}

export default SnackBar;