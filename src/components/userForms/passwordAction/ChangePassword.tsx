import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/userFields";
import { UpdateUser } from "api/userrequests";
import { NewPasswordFormValidation } from "../userFormValidation";

import "../styleForm.scss";

interface IChangePassword {
    token: string;
}

interface IPasswordData {
    newpassword: string;
    confirmpassword: string
}

const ChangePassword: React.FC<IChangePassword> = ({ token }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [matchPass, setMatchPass] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(NewPasswordFormValidation);

    const onSubmit = (data: IPasswordData): void => {
        if (data.newpassword === data.confirmpassword) {
            setMatchPass(false);
            setLoading(true);
            const { newpassword } = data;
            UpdateUser({ password: newpassword }, token)
                .then(response => {
                    console.log(response.message);
                    setSuccess(true);
                    setLoading(false);
                    reset();
                })
                .catch(error => {
                    console.log(error.message);
                    setError(true);
                });
        } else {
            console.log("don`t match", data);
            setMatchPass(true);
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
                    Change password
                </Button>
            </Box>
            {error && (
                <Typography className="form error_message">
                    {"Incorrect data!"}
                </Typography>
            )}
            {matchPass && (
                <Typography className="form error_message">
                    {"Passwords don't match!"}
                </Typography>
            )}
            {loading && (
                <Typography className="form success_message">
                    {"Loading..."}
                </Typography>
            )}
            {success && (
                <Typography className="form success_message">
                    {"Password successfully changed!"}
                </Typography>
            )}
        </>
    );
}

export default ChangePassword;