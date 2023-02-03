import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";

import ChangePassword from "./ChangePassword";
import ConfirmPassword from "./ConfirmPassword";

import styles from "./password.module.scss";

const PasswordForm: React.FC = () => {

    const [confirmPassword, setConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const confirmStatus = (data: boolean): void => {
        setConfirmPassword(data);
    }

    return (
        <Container maxWidth="sm" className={styles.form}>
            <Typography className={styles.form__title} component="h2">
                {confirmPassword ? 'Change password' : 'Confirm current password'}
            </Typography>
            {!confirmPassword && <ConfirmPassword confirmStatus={confirmStatus} />}
            {confirmPassword && <ChangePassword />}
            <Button className={styles.form__submit_button} onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    )
}

export default PasswordForm;
