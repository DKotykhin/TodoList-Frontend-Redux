import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "./ProfileFormValidation";
import AvatarUploadForm from "./AvatarUploadForm";
import { EmailField, NameField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";

import { UpdateUser } from "api/userrequests";
import { useAppDispatch } from "store/hook";
import { updateName } from "store/userSlice";

import { IUserUpdate, IUser } from "types/userTypes";

const ProfileForm: React.FC<{ userdata: IUser }> = ({ userdata }) => {

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState('');
    const [updateError, setUpdateError] = useState('');
    const dispatch = useAppDispatch();

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm(ProfileFormValidation);

    useEffect(() => {
        reset({ name: userdata.name, email: userdata.email });
    }, [reset, userdata.name, userdata.email]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUpdateError('');
        }, 5500);
        return () => clearTimeout(timer);
    }, [updateError]);

    const onSubmit = (data: IUserUpdate): void => {
        const { name } = data;
        if (name !== userdata.name) {
            setLoading(true);
            setLoaded('');
            setUpdateError('')
            UpdateUser({ name })
                .then((response) => {
                    console.log(response.message);
                    setLoaded(response.message);
                    dispatch(updateName(response.name));
                })
                .catch((error) => {
                    console.log(error.response.data.message || error.message);
                    setUpdateError(error.response.data.message || error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else setUpdateError('The same name!');
    };

    return (
        <Paper elevation={10} sx={{ my: 2 }}>
            <AvatarUploadForm userdata={userdata} />
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
            >
                <EmailField
                    disabled={true}
                    error={errors.email}
                    control={control}
                />
                <Box sx={{ my: 4 }}>
                    <NameField
                        label="Change your name"
                        error={errors.name}
                        control={control}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ m: 3 }}
                >
                    {loading ? 'Loading...' : 'Save name'}
                </Button>
                <SnackBar successMessage={loaded} errorMessage={updateError} />
            </Box>
        </Paper>
    )
}

export default ProfileForm;