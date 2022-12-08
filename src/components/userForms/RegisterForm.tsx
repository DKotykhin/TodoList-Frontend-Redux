import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { EmailField, NameField, PasswordField } from "components/userFields";
import { RegisterFormValidation } from "./userFormValidation";

import { RegisterUser } from "api/userrequests";
import { IUserRegister } from "types/userTypes";

import "./style.scss";

const RegisterForm = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IUserRegister>(RegisterFormValidation);

    const onSubmit = (data: IUserRegister) => {
        setLoading(true);
        RegisterUser(data)
            .then((response) => {
                console.log(response.message);                
                sessionStorage.setItem("rememberMe", response.token);                
                navigate("/");
                reset();
            })
            .catch((error) => {
                console.log(error.message);
                setError(true);
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="sm" className="form">
            <Typography className="title" component="h2">
                {loading ? "Registered..." : "Registration Form"}
            </Typography>
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    "& > :not(style)": {
                        width: "300px",
                        display: "block",
                        m: "50px auto",
                    },
                }}
            // noValidate
            // autoComplete="off"
            >
                <NameField label='name' error={errors.name} control={control} />
                <EmailField disabled={false} error={errors.email} control={control} />
                <PasswordField
                    name={"Password"}
                    error={errors.password}
                    control={control}
                />
                <Button
                    disabled={!isValid}
                    className="submit_button"
                    type="submit"
                >
                    {"Register"}
                </Button>
            </Box>
            {error && (
                <Typography className="error_title">
                    {"Can't register user"}
                </Typography>
            )}
            <Typography className="subtitle">
                {"Already have account?"}
            </Typography>
            <Button className="submit_button" component={Link} to="/login">
                {"Login"}
            </Button>
        </Container>
    );
}

export default RegisterForm;
