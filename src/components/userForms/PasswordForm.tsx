import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";

import ChangePassword from "./passwordAction/ChangePassword";
import ConfirmPassword from "./passwordAction/ConfirmPassword";

import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

import "./styleForm.scss";

const PasswordForm: React.FC = () => {

    const [confirmCurrentPassword, setConfirmCurrentPassword] = useState(false);
    const { userdata } = useAppSelector(selectUser);
    const { token } = userdata;

    const navigate = useNavigate();

    const confirmStatus = (data: boolean): void => {
        setConfirmCurrentPassword(data)
    }

    return (
        <Container maxWidth="sm" className="form">
            <Typography className="form title" component="h2">
                {confirmCurrentPassword ? 'Change password' : 'Confirm current password'}
            </Typography>
            {!confirmCurrentPassword && <ConfirmPassword token={token} confirmStatus={confirmStatus} />}
            {confirmCurrentPassword && <ChangePassword token={token} />}
            <Button className="form submit_button" onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    );
}

export default PasswordForm;
