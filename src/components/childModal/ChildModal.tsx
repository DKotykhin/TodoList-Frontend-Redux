import * as React from 'react';

import { Box, Modal, Button, Typography, Divider } from '@mui/material';

import styles from './childModal.module.scss';

interface IChildModal {
    open: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
    title: string;
}
const ChildModal: React.FC<IChildModal> = ({ open, handleClose, handleSubmit, title }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={styles.modal}
        >
            <Box className={styles.modal__box}>
                <Typography className={styles.modal__title}>
                    {`Really want to delete ${title}?`}
                </Typography>
                <Typography className={styles.modal__text}>
                    You can't cancel this operation
                </Typography>
                <Divider className={styles.modal__divider}/>
                <Box className={styles.modal__buttons}>
                    <Button className={styles.modal__cancel} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className={styles.modal__delete} onClick={handleSubmit}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ChildModal;