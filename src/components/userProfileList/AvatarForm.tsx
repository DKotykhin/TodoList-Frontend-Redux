import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import UserMessage from "components/userMessage/UserMessage";
import DeleteDialog from "./DeleteDialog";
import { UploadAvatar, DeleteAvatar } from "api/userrequests";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

import "./avatarForm.scss";

const AvatarForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState('');
    const [loadError, setLoadError] = useState('');

    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const [fileName, setFileName] = useState('');
    const { userdata: { user } } = useAppSelector(selectUser);
    const { register, reset, handleSubmit } = useForm();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded('');
            setDeleted('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [loaded, deleted]);

    const onSubmit = (data: FieldValues): void => {
        if (data.avatar.length) {
            setLoading(true);
            const formData = new FormData();
            formData.append("avatar", data.avatar[0], data.avatar[0].name);
            UploadAvatar(formData)
                .then((response) => {
                    console.log(response.message);
                    setLoaded(response.message);                    
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
    };

    const handleDelete = () => {       
        setDeleting(true);       
        const data: string | undefined = user?.avatarURL;
        if (data) {
            DeleteAvatar()
                .then((response) => {
                    console.log(response.message);
                    setDeleted(response.message);                    
                })
                .catch((error) => {
                    console.log(error.message);
                    setDeleteError(error.response.data.message || error.message);
                })
                .finally(() => {
                    setDeleting(false);
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
                <UserMessage loading={loading} loaded={loaded} error={loadError} />
                <Button
                    className="avatar button"
                    variant="outlined"
                    type="submit"
                    disabled={!fileName}
                >
                    Upload
                </Button>
            </Box>           
            <UserMessage loading={deleting} loaded={deleted} error={deleteError} />
            <DeleteDialog
                buttonTitle={"delete avatar"}
                dialogTitle={"You really want to delete avatar?"}
                deleteAction={handleDelete}
            />            
        </Box>
    );
};

export default AvatarForm;
