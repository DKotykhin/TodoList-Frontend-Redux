import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Container, Typography, Box, Avatar, Paper } from "@mui/material";
import { InputLabel, Checkbox } from "@mui/material";

import { EmailField, PasswordField } from "components/userFields";
import { LoginFormValidation } from "./userFormValidation";

import { LoginUser } from "api/userrequests";
import { useAppDispatch } from 'store/reduxHooks';
import { createUser } from "store/userSlice";
import { IUserLogin } from "types/userTypes";

import "./styleForm.scss";

interface IUserData extends IUserLogin {
    rememberMe: boolean
}

const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IUserData>(LoginFormValidation);

    const onSubmit = (data: IUserData): void => {
        const { email, password } = data;
        setLoading(true);
        LoginUser({ email, password })
            .then((response) => {
                console.log(response.message);
                dispatch(createUser(response));
                const { token } = response;
                if (data.rememberMe) {
                    localStorage.setItem("rememberMe", token);
                }
                sessionStorage.setItem("rememberMe", token);
                navigate("/");
                reset();
            })
            .catch((error) => {
                console.log(error.response.data.message || error.message);
                toast.error(error.response.data.message || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="xs" className="form">
            <Paper elevation={10} className="form paper">
                <Typography className="form title" component="h2">
                    {"Login"}
                </Typography>
                <Avatar className="form avatar" />
                <Box
                    className="form field"
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                    <InputLabel>
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => <Checkbox {...field} />}
                            defaultValue={false}
                        />
                        Remember me
                    </InputLabel>
                    <Button
                        disabled={!isValid}
                        type="submit"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                </Box>
            </Paper>
            <Typography className="form subtitle">
                {"Don't have account?"}
            </Typography>
            <Button
                className="form submit_button"
                component={Link}
                to="/registration"
            >
                Registration
            </Button>
        </Container>
    );
};

export default LoginForm;
