import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Container, Typography, Avatar, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { EmailField, NameField, PasswordField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";
import { RegisterFormValidation } from "./userFormValidation";

import { RegisterUser } from "api/userrequests";
import { useAppDispatch } from 'store/hook';
import { createUser } from "store/userSlice";
import { IUserRegister } from "types/userTypes";

import "./styleForm.scss";

const RegisterForm = () => {
    const [error, setError] = useState('');
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
        setError('')
        RegisterUser(data)
            .then(response => {
                console.log(response.message);
                dispatch(createUser(response));
                sessionStorage.setItem("rememberMe", response.token);
                navigate("/");
                reset();
            })
            .catch(error => {
                console.log(error.response.data.message || error.message);
                setError(error.response.data.message || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="xs" className="form">
            <Paper elevation={10} className="form paper">
                <Typography className="form title" component="h2">
                    {"Registration"}
                </Typography>
                <Avatar className="form avatar" />
                <Box
                    className="form field"
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
                        disabled={!isValid}
                        className="form submit_button"
                        type="submit"
                    >
                        {loading ? 'Loading...' : "Register"}
                    </Button>
                </Box>
                <SnackBar successMessage="" errorMessage={error} />
            </Paper>
            <Typography className="form subtitle">
                {"Already have account?"}
            </Typography>
            <Button className="form submit_button" component={Link} to="/login">
                {"Login"}
            </Button>
        </Container>
    );
}

export default RegisterForm;
