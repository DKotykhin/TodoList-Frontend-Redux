import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import DeleteDialog from "./DeleteDialog";
import { UploadAvatar, DeleteAvatar } from "api/userrequests";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

import "./avatarForm.scss";


const AvatarForm: React.FC = () => {
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [loadedAvatar, setLoadedAvatar] = useState(false);
    const [deletingAvatar, setDeletingAvatar] = useState(false);
    const [deletedAvatar, setDeletedAvatar] = useState(false);
    const [fileName, setFileName] = useState("");

    const { userdata: { user, token } } = useAppSelector(selectUser);

    const { register, reset, handleSubmit } = useForm();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadedAvatar(false);
            setDeletedAvatar(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, [loadedAvatar, deletedAvatar]);

    const onSubmit = (data: FieldValues): void => {        
        if (data.avatar.length) {
            setLoadingAvatar(true);
            const formData = new FormData();
            formData.append("avatar", data.avatar[0], data.avatar[0].name);
            UploadAvatar(formData, token)
                .then((response) => {
                    console.log(response.message);
                    setLoadedAvatar(true);
                    setLoadingAvatar(false);
                    reset();
                    setFileName("");
                })
                .catch((error) => {
                    console.warn(error.message);
                    alert("Upload Avatar Error");
                });
        } else {
            console.log("Avatar: No Data");
            alert("No File in Avatar Field");
        }
    };

    const handleDelete = () => {
        setLoadedAvatar(false);
        setDeletingAvatar(true);
        setDeletedAvatar(false);
        const data: string | undefined = user?.avatarURL;
        if (data) {
            DeleteAvatar(data, token)
                .then((response) => {
                    console.log(response.message);
                    setDeletedAvatar(true);
                    setDeletingAvatar(false);
                })
                .catch((error) => {
                    console.warn(error.message);
                    alert("Deleted Avatar Error");
                });
        } else alert("Avatar doesn't exist");
    };

    const onChange = (e: any) => {
        setFileName(e.target.files[0].name);
    };

    const onReset = () => {
        reset();
        setFileName("");
    };

    return (
        <Box className="avatar">
            <Typography className="avatar title">Change Avatar</Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box>
                    <Typography
                        component="label"
                        onChange={onChange}
                    >
                        {fileName ? fileName : "choose file..."}
                        <Typography
                            component="input"
                            {...register("avatar")}
                            color="primary"
                            type="file"
                            hidden
                        />
                    </Typography>
                    {fileName && (
                        <CloseIcon className="avatar close_icon"
                            onClick={onReset}
                        />
                    )}
                </Box>
                <Button
                    className="avatar button"
                    variant="outlined"
                    type="submit"
                    disabled={!fileName}
                >
                    Upload
                </Button>
            </Box>
            <Typography className="avatar message"
                color="primary"
            >
                {loadingAvatar
                    ? "Loading..."
                    : loadedAvatar
                        ? "Avatar loaded succesfully"
                        : ""}
            </Typography>
            <Typography className="avatar message"
                color="error"
            >
                {deletingAvatar
                    ? "Deleting..."
                    : deletedAvatar
                        ? "Avatar deleted succesfully"
                        : ""}
            </Typography>
            <DeleteDialog
                buttonTitle={"delete avatar"}
                dialogTitle={"You really want to delete avatar?"}
                deleteAction={handleDelete}
            />
        </Box>
    );
};

export default AvatarForm;
