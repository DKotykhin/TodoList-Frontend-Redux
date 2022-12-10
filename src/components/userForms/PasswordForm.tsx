import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/userFields";
import { UpdateUser } from "api/userrequests";
import { PasswordFormValidation } from "./userFormValidation";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

import "./styleForm.scss";

interface IPasswordData {
    password: string;
    confirmpassword: string
}

const PasswordForm = () => {    
    const { userdata } = useAppSelector(selectUser);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [matchPass, setMatchPass] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(PasswordFormValidation);

    const onSubmit = (data: IPasswordData): void => {
        if (data.password === data.confirmpassword) {
            setMatchPass(false);
            setLoading(true);            
            const { password } = data;
            UpdateUser({ password }, userdata.token)
                .then((response) => {
                    console.log(response.message);
                    setSuccess(true);
                    setLoading(false);
                    reset();
                })
                .catch((error) => {
                    console.log(error.message);
                    setError(true);
                });
        } else {
            console.log("don`t match", data);
            setMatchPass(true);
        }
    };
 
    return (
        <Container maxWidth="sm" className="form">
            <Typography className="form title" component="h2">
                {loading ? "Loading..." : "Change password"}
            </Typography>
            <Box
                className="form field"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <PasswordField
                    name={"Password"}
                    error={errors.password}
                    control={control}
                />
                <PasswordField
                    name={"Confirmpassword"}
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
            {success && (
                <Typography sx={{ mb: 3 }} className="form sucsess_message" color={"primary"}>
                    {"Password successfully changed!"}
                </Typography>
            )}
            <Button className="form submit_button" onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    );
}

export default PasswordForm;
