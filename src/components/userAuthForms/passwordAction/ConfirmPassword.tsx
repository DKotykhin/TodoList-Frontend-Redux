import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";
import { PasswordFormValidation } from "../userFormValidation";
import { UserConfirmPassword } from 'api/userrequests';

import "../styleForm.scss";

interface IConfirmPassword {
    confirmStatus: (arg0: boolean) => void;
}

interface IPasswordData {
    currentpassword: string
}

const ConfirmPassword: React.FC<IConfirmPassword> = ({ confirmStatus }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IPasswordData>(PasswordFormValidation);

    const onSubmit = (data: IPasswordData): void => {
        setLoading(true);
        setError('');
        const { currentpassword } = data;
        UserConfirmPassword({ password: currentpassword })
            .then(response => {
                console.log(response.message);
                if (response.status) {
                    confirmStatus(response.status)
                } else {
                    setError(response.message);
                }
            })
            .catch(error => {
                console.log(error.response.data.message || error.message);
                setError(error.response.data.message || error.message);
            })
            .finally(() => {
                setLoading(false);
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
                    {loading ? 'Loading...' : "Confirm password"}
                </Button>
            </Box>
            <SnackBar successMessage="" errorMessage={error} />
        </>
    )
}

export default ConfirmPassword;
