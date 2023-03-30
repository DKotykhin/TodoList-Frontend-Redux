import React, { useState } from 'react';
import { useForm, FieldValues } from "react-hook-form";
import { toast } from 'react-toastify';

import { Avatar, Box, Tooltip, IconButton, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import AvatarDeleteForm from './AvatarDeleteForm';

import User from "api/userrequests";
import { useAppDispatch } from "store/reduxHooks";
import { addAvatar } from "store/userSlice";

import { IUser } from 'types/userTypes';

import styles from './avatarForm.module.scss';

const checkFileType = (type: string): boolean => {
    return (type === 'image/jpeg' || type === 'image/png' || type === 'image/webp');
};
const Base_URL = process.env.REACT_APP_BACKEND_URL;

const AvatarUploadForm: React.FC<{ userdata: IUser }> = ({ userdata }) => {

    const { avatarURL } = userdata;

    const [loading, setLoading] = useState(false);

    const [fileName, setFileName] = useState('');
    const dispatch = useAppDispatch();

    const { register, reset, handleSubmit } = useForm();

    const userAvatarURL = avatarURL ? Base_URL + avatarURL : "/";

    const onChange = (e: any) => {
        setFileName(e.target.files[0].name);
        const isApproved = checkFileType(e.target.files[0].type);
        if (!isApproved) toast.warn("Incorrect file type");
        if (e.target.files[0].size > 1024000) toast.warn("File shoul be less then 1Mb");
    };
    const onReset = () => {
        reset();
        setFileName("");
    };

    const onSubmit = (data: FieldValues): void => {
        const isApproved = checkFileType(data.avatar[0].type);
        if (!isApproved) {
            toast.error("Can't upload this type of file");
        } else if (data.avatar[0].size > 1024000) {
            toast.error("Too large file to upload!");
        } else if (data.avatar.length) {
            setLoading(true);
            const formData = new FormData();
            formData.append("avatar", data.avatar[0], data.avatar[0].name);
            User.UploadAvatar(formData)
                .then((response) => {
                    toast.success(response.message);
                    dispatch(addAvatar(response.avatarURL));
                    setFileName("");
                    reset();
                })
                .catch((error) => {
                    toast.error(error.response.data.message || error.message);
                })
                .finally(() => setLoading(false));
        } else {
            toast.warn("No File in Avatar Field");
        }
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className={styles.avatarForm}
        >
            <Box component="label" onChange={onChange}>
                <Tooltip title="Change Avatar" placement="left" arrow>
                    <Avatar
                        className={styles.avatarForm__avatar}
                        src={userAvatarURL}
                    />
                </Tooltip>
                <Box
                    {...register("avatar")}
                    component="input"
                    type="file"
                    hidden
                />
            </Box>
            {loading ?
                <Typography className={styles.avatarForm__loading}>
                    Loading...
                </Typography>
                : fileName ? (
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
                ) : <AvatarDeleteForm avatarURL={avatarURL} />
            }
        </Box>
    )
}

export default AvatarUploadForm;