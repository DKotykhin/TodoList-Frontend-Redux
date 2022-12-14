import React, { useState, useEffect } from 'react';
import { useForm, FieldValues } from "react-hook-form";

import { Avatar, Box, Tooltip, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import UserMessage from "components/userMessage/UserMessage";
import DeleteDialog from "../userDeleteForm/DeleteDialog";

import { UploadAvatar, DeleteAvatar } from "api/userrequests";
import { selectUser } from "store/selectors";
import { useAppSelector, useAppDispatch } from "store/hook";
import { addAvatar } from "store/userSlice";

const AvatarForm: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState('');
    const [loadError, setLoadError] = useState('');

    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const [fileName, setFileName] = useState('');
    const { userdata } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const { register, reset, handleSubmit } = useForm();

    const userAvatarURL = userdata.avatarURL ? `https://todolist-new17.herokuapp.com/api${userdata.avatarURL}` : "/";

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded('');
            setDeleted('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [loaded, deleted]);

    const onChange = (e: any) => {
        setFileName(e.target.files[0].name);
    };
    const onReset = () => {
        reset();
        setFileName("");
    };

    const onSubmit = (data: FieldValues): void => {
        if (data.avatar.length) {
            setLoading(true);
            const formData = new FormData();
            formData.append("avatar", data.avatar[0], data.avatar[0].name);
            UploadAvatar(formData)
                .then((response) => {
                    console.log(response.message);
                    setLoaded(response.message);
                    dispatch(addAvatar(`/upload/${userdata._id}-${data.avatar[0].name}`));
                    reset();
                    setFileName("");
                })
                .catch((error) => {
                    console.log(error.message);
                    setLoadError(error.response.data.message || error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            console.log("Avatar: No Data");
            setLoadError("No File in Avatar Field");
        }
    }

    const handleDelete = (): void => {
        setDeleting(true);
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
                .finally(() => {
                    setDeleting(false);
                });
        } else alert("Avatar doesn't exist");
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Box sx={{ cursor: 'pointer' }} onChange={onChange} component="label">
                <Tooltip title="Change Avatar" placement="left" arrow>
                    <Avatar
                        sx={{ width: 150, height: 150, margin: '0 auto' }}
                        src={userAvatarURL}
                    />
                </Tooltip>
                <Box
                    component="input"
                    {...register("avatar")}
                    type="file"
                    hidden
                />
            </Box>
            {fileName ? (
                <>
                    {fileName}
                    <IconButton onClick={onReset}>
                        <Tooltip title="Cancel" placement="top" arrow>
                            <CloseIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton type="submit">
                        <Tooltip title="Upload" placement="top" arrow>
                            <FileUploadIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                </>
            ) : <DeleteDialog
                dialogTitle={"You really want to delete avatar?"}
                deleteAction={handleDelete}
            />}
            <UserMessage loading={loading} loaded={loaded} error={loadError} />
            <UserMessage loading={deleting} loaded={deleted} error={deleteError} />
        </Box>
    )
}

export default AvatarForm;