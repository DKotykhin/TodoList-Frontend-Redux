import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/userFields";
import { PasswordFormValidation } from "../userFormValidation";
import { UserConfirmPassword } from 'api/userrequests';

import "../styleForm.scss";

interface IConfirmPassword {
    confirmStatus: (arg0: boolean) => void
}

interface IPasswordData {
    currentpassword: string
}

const ConfirmPassword: React.FC<IConfirmPassword> = ({ confirmStatus }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IPasswordData>(PasswordFormValidation);

    const onSubmit = (data: IPasswordData): void => {
        setLoading(true);
        const { currentpassword } = data;
        UserConfirmPassword({ password: currentpassword })
            .then(response => {
                console.log(response.message);
                if (response.status) {
                    confirmStatus(response.status)
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error.message);
                setError(true);
            });
    }

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
                    name={"Current password"}
                    error={errors.currentpassword}
                    control={control}
                />
                <Button
                    disabled={!isValid}
                    className="form submit_button"
                    type="submit"
                >
                    Confirm password
                </Button>
            </Box>
            {error && (
                <Typography className="form error_message">
                    {"Incorrect password!"}
                </Typography>
            )}
            {loading && (
                <Typography className="form success_message">
                    {"Loading..."}
                </Typography>
            )}
        </>
    )
}

export default ConfirmPassword;
