import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/fields/userFields";
import User from "api/userrequests";
import { NewPasswordFormValidation } from "../../validations/userFormValidation";

import styles from "./password.module.scss";

interface IPasswordData {
    newpassword: string;
    confirmpassword: string
}

const ChangePassword: React.FC = () => {

    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(NewPasswordFormValidation);

    const onSubmit = (data: IPasswordData): void => {
        if (data.newpassword === data.confirmpassword) {
            setLoading(true);
            const { newpassword } = data;
            User.UpdateUserPassword({ password: newpassword })
                .then(response => {
                    console.log(response.message);
                    toast.success('Password successfully changed!');
                    reset();
                })
                .catch(error => {
                    toast.error(error.response.data.message || error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            toast.warn("Passwords don't match");
        }
    };

    return (
        <Box
            className={styles.form__field}
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
                className={styles.form__submit_button}
                type="submit"
            >
                {loading ? 'Loading...' : "Change password"}
            </Button>
        </Box>
    );
}

export default ChangePassword;