import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";
import { UpdateUser } from "api/userrequests";
import { NewPasswordFormValidation } from "../userFormValidation";

import "../styleForm.scss";

interface IPasswordData {
    newpassword: string;
    confirmpassword: string
}

const ChangePassword: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState('');
    const [error, setError] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(NewPasswordFormValidation);

    const onSubmit = (data: IPasswordData): void => {
        setError('');
        setLoaded('');
        if (data.newpassword === data.confirmpassword) {
            setLoading(true);
            const { newpassword } = data;
            UpdateUser({ password: newpassword })
                .then(response => {
                    console.log(response.message);
                    setLoaded('Password successfully changed!');
                    reset();
                })
                .catch(error => {
                    console.log(error.response.data.message || error.message);
                    setError(error.response.data.message || error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            console.log("Passwords don't match");
            setError("Passwords don't match");
        }
    };

    return (
        <>
            <Box
                className="form field"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <PasswordField
                    name={"New password"}
                    error={errors.newpassword}
                    control={control}
                />
                <PasswordField
                    name={"Confirm password"}
                    error={errors.confirmpassword}
                    control={control}
                />
                <Button
                    disabled={!isValid}
                    className="form submit_button"
                    type="submit"
                >
                    {loading ? 'Loading...' : "Change password"}
                </Button>
            </Box>            
            <SnackBar successMessage={loaded} errorMessage={error} />
        </>
    );
}

export default ChangePassword;