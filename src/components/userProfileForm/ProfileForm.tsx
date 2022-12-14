import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "./ProfileFormValidation";
import AvatarForm from "./AvatarForm";
import { EmailField, NameField } from "components/userFields";
import UserMessage from "components/userMessage/UserMessage";

import { UpdateUser } from "api/userrequests";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

const ProfileForm: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState('');
    const [updateError, setUpdateError] = useState('');
    ;
    const { userdata: { name, email } } = useAppSelector(selectUser);

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm(ProfileFormValidation);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [loaded]);

    useEffect(() => {
        reset({ name, email });
    }, [reset, email, name]);

    const onSubmit = (data: { name?: string, email?: string }): void => {
        const { name } = data;
        setLoading(true);
        setLoaded('');
        setUpdateError('')
        UpdateUser({ name })
            .then((response) => {
                console.log(response.message);
                setLoaded(response.message);
            })
            .catch((error) => {
                console.log(error.message);
                setUpdateError(error.response.data.message || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Paper elevation={10} sx={{ my: 2 }}>
            <AvatarForm />
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

                <UserMessage loading={loading} loaded={loaded} error={updateError} />
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ m: 3 }}
                >
                    Save name
                </Button>
            </Box>
        </Paper>
    )
}

export default ProfileForm;