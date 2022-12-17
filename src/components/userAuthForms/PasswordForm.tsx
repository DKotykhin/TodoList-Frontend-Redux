import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";

import ChangePassword from "./passwordAction/ChangePassword";
import ConfirmPassword from "./passwordAction/ConfirmPassword";

import "./styleForm.scss";

const PasswordForm: React.FC = () => {

    const [confirmCurrentPassword, setConfirmCurrentPassword] = useState(false);
    const navigate = useNavigate();

    const confirmStatus = (data: boolean): void => {
        setConfirmCurrentPassword(data);
    }

    return (
        <Container maxWidth="sm" className="form">
            <Typography className="form title password" component="h2">
                {confirmCurrentPassword ? 'Change password' : 'Confirm current password'}
            </Typography>
            {!confirmCurrentPassword && <ConfirmPassword confirmStatus={confirmStatus} />}
            {confirmCurrentPassword && <ChangePassword />}
            <Button className="form submit_button" onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    )
}

export default PasswordForm;
