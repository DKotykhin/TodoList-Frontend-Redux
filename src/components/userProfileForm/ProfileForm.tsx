import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "./ProfileFormValidation";
import AvatarUploadForm from "./AvatarUploadForm";
import { EmailField, NameField } from "components/userFields";

import { UpdateUser } from "api/userrequests";
import { useAppDispatch } from "store/reduxHooks";
import { updateName } from "store/userSlice";

import { IUserUpdate, IUser } from "types/userTypes";

const ProfileForm: React.FC<{ userdata: IUser }> = ({ userdata }) => {

    const [loading, setLoading] = useState(false);
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

    const onSubmit = (data: IUserUpdate): void => {
        const { name } = data;
        if (name !== userdata.name) {
            setLoading(true);
            UpdateUser({ name })
                .then((response) => {
                    toast.success(response.message);
                    dispatch(updateName(response.name));
                })
                .catch((error) => {
                    toast.error(error.response.data.message || error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            toast.warn('The same name!')
        }
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
            </Box>
        </Paper>
    )
}

export default ProfileForm;