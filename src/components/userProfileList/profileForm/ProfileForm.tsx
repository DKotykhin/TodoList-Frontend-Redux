import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "../../validations/profileFormValidation";
import AvatarUploadForm from "../avatarForm/AvatarUploadForm";
import { EmailField, NameField } from "components/fields/userFields";

import { UpdateUserName } from "api/userrequests";
import { useAppDispatch } from "store/reduxHooks";
import { updateName } from "store/userSlice";

import { IUser } from "types/userTypes";

import styles from "./profileForm.module.scss";

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

    const onSubmit = (data: FieldValues): void => {
        const { name } = data;
        if (name !== userdata.name) {
            setLoading(true);
            UpdateUserName({ name })
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
        <Paper elevation={10} className={styles.profileForm}>
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
                <NameField
                    label="Change your name"
                    error={errors.name}
                    control={control}
                />
                <Button type="submit" className={styles.profileForm__submit_button}>
                    {loading ? 'Loading...' : 'Save name'}
                </Button>
            </Box>
        </Paper>
    )
}

export default ProfileForm;