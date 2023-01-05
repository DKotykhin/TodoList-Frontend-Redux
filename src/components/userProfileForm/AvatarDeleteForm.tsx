import React, { useState, useEffect } from 'react';

import DeleteDialog from "../userDeleteForm/DeleteDialog";
import SnackBar from 'components/snackBar/SnackBar';

import { DeleteAvatar } from "api/userrequests";

import { useAppDispatch } from "store/hook";
import { addAvatar } from "store/userSlice";

import { IUser } from 'types/userTypes';

const AvatarDeleteForm: React.FC<{ userdata: IUser }> = ({ userdata }) => {

    const [deleted, setDeleted] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDeleted('');
            setDeleteError('');
        }, 7000);
        return () => clearTimeout(timer);
    }, [deleteError, deleted]);

    const handleDelete = (): void => {
        const data: string | undefined = userdata?.avatarURL;
        if (data) {
            DeleteAvatar()
                .then((response) => {
                    console.log(response.message);
                    setDeleted(response.message);
                    dispatch(addAvatar(''))
                })
                .catch((error) => {
                    console.log(error.message);
                    setDeleteError(error.response.data.message || error.message);
                })
        } else {
            console.log("Avatar doesn't exist");
            setDeleteError("Avatar doesn't exist");
        }
    }

    return (
        <>
            <DeleteDialog
                dialogTitle={"You really want to delete avatar?"}
                deleteAction={handleDelete}
            />
            <SnackBar successMessage={deleted} errorMessage={deleteError} />
        </>
    )
}

export default AvatarDeleteForm;