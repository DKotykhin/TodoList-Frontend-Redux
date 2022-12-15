import React, { useState, useEffect } from 'react';

import UserMessage from "components/userMessage/UserMessage";
import DeleteDialog from "../userDeleteForm/DeleteDialog";

import { DeleteAvatar } from "api/userrequests";
import { selectUser } from "store/selectors";
import { useAppSelector, useAppDispatch } from "store/hook";
import { addAvatar } from "store/userSlice";

const AvatarDeleteForm: React.FC = () => {

    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const { userdata } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDeleted('');
            setDeleteError('');
        }, 4000);
        return () => clearTimeout(timer);
    }, [deleteError, deleted]);

    const handleDelete = (): void => {
        const data: string | undefined = userdata?.avatarURL;
        if (data) {
            setDeleting(true);
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
                .finally(() => {
                    setDeleting(false);
                });
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
            <UserMessage loading={deleting} loaded={deleted} error={deleteError} />
        </>
    )
}

export default AvatarDeleteForm;