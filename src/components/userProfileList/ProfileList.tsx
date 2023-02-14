import React from "react";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { Button, Typography, Container, Paper } from "@mui/material";

import DeleteForm from "./deleteForm/DeleteForm";
import ProfileForm from "./profileForm/ProfileForm";
import UserStatistic from "./userStatistic/UserStatistic";

import { selectUser } from "store/selectors";
import { useAppSelector } from "store/reduxHooks";

import styles from "./profileList.module.scss";

const ProfileList: React.FC = () => {

    const navigate = useNavigate();
    const { userdata } = useAppSelector(selectUser);
    const { createdAt, name } = userdata;

    return (
        <Container maxWidth="xs" className={styles.profile}>
            <Paper elevation={10} className={styles.profile__paper}>
                <Typography className={styles.profile__title} component="h2">
                    {name}
                </Typography>
                <Typography sx={{ pb: 1 }}>
                    {`Created: ${format(
                        new Date(createdAt),
                        "dd LLL yyyy 'at' H:mm"
                    )}`}
                </Typography>
            </Paper>
            <UserStatistic />
            <ProfileForm userdata={userdata} />
            <DeleteForm />
            <Button className={styles.profile__link} sx={{ m: 6 }} onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    )
};

export default ProfileList;
