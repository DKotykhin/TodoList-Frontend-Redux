import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Container, Typography, Avatar, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { EmailField, NameField, PasswordField } from "components/fields/userFields";
import { RegisterFormValidation } from "../validations/userFormValidation";

import { RegisterUser } from "api/userrequests";
import { useAppDispatch } from 'store/reduxHooks';
import { createUser } from "store/userSlice";
import { IUserRegister } from "types/userTypes";

import styles from "./form.module.scss";

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IUserRegister>(RegisterFormValidation);

    const onSubmit = (data: IUserRegister): void => {
        setLoading(true);
        RegisterUser(data)
            .then(response => {
                // console.log(response.message);
                dispatch(createUser(response));
                sessionStorage.setItem("rememberMe", response.token);
                navigate("/");
                reset();
            })
            .catch(error => {
                toast.error(error.response.data.message || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="xs" className={styles.form}>
            <Paper elevation={10} className={styles.form__paper}>
                <Typography className={styles.form__title} component="h2">
                    {"Registration"}
                </Typography>
                <Avatar className={styles.form__avatar} />
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <NameField
                        label='Name'
                        error={errors.name}
                        control={control} />
                    <EmailField
                        disabled={false}
                        error={errors.email}
                        control={control}
                    />
                    <PasswordField
                        name={"Password"}
                        error={errors.password}
                        control={control}
                    />
                    <Button
                        className={styles.form__submit_button}
                        disabled={!isValid}
                        type="submit"
                    >
                        {loading ? 'Loading...' : "Register"}
                    </Button>
                </Box>
            </Paper>
            <Typography className={styles.form__subtitle}>
                {"Already have account?"}
            </Typography>
            <Button className={styles.form__return_button} component={Link} to="/login">
                {"Login"}
            </Button>
        </Container>
    );
}

export default RegisterForm;
