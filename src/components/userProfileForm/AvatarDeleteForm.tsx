import React from 'react';
import { toast } from 'react-toastify';

import DeleteDialog from "../userDeleteForm/DeleteDialog";

import { DeleteAvatar } from "api/userrequests";

import { useAppDispatch } from "store/hook";
import { addAvatar } from "store/userSlice";

import { IUser } from 'types/userTypes';

const AvatarDeleteForm: React.FC<{ userdata: IUser }> = ({ userdata }) => {

    const dispatch = useAppDispatch();

    const handleDelete = (): void => {
        const data: string | undefined = userdata?.avatarURL;
        if (data) {
            DeleteAvatar()
                .then((response) => {
                    toast.success(response.message);
                    dispatch(addAvatar(''))
                })
                .catch((error) => {
                    toast.error(error.response.data.message || error.message);
                })
        } else {
            toast.warn("Avatar doesn't exist");
        }
    };

    return (
        <>
            <DeleteDialog
                dialogTitle={"You really want to delete avatar?"}
                deleteAction={handleDelete}
            />
        </>
    )
}

export default AvatarDeleteForm;