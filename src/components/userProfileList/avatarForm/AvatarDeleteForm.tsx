import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ChildModal from "components/childModal/ChildModal";

import User from "api/userrequests";

import { useAppDispatch } from "store/reduxHooks";
import { addAvatar } from "store/userSlice";

import styles from './avatarForm.module.scss';


const AvatarDeleteForm: React.FC<{ avatarURL: string }> = ({ avatarURL }) => {

    const [loading, setLoading] = useState(false);
    const [openChildModal, setOpenChildModal] = useState(false);
    const dispatch = useAppDispatch();

    const handleSubmit = (): void => {
        setOpenChildModal(false);
        setLoading(true);
        if (avatarURL) {
            User.DeleteAvatar()
                .then((response) => {
                    toast.success(response.message);
                    dispatch(addAvatar(''))
                })
                .catch((error) => {
                    toast.error(error.response.data.message || error.message);
                })
                .finally(() => setLoading(false))
        } else {
            toast.warn("Avatar doesn't exist");
        }
    };

    const handleClick = (): void => {
        setOpenChildModal(true);
    };
    const handleClose = (): void => {
        setOpenChildModal(false);
    };

    return (
        <>
            {loading ?
                <Typography className={styles.avatarForm__loading}>
                    Loading...
                </Typography> :
                <DeleteForeverIcon onClick={handleClick} className={styles.deleteForm__icon} />
            }
            <ChildModal
                open={openChildModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                title={'avatar'}
            />
        </>
    )
};

export default AvatarDeleteForm;