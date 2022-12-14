import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { format } from "date-fns";
import { Button, Typography, Container, Paper } from "@mui/material";

import DeleteForm from "../userDeleteForm/DeleteForm";
import ProfileForm from "../userProfileForm/ProfileForm";

import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

import "./profilelist.scss";

const ProfileList: React.FC = () => {

    const navigate = useNavigate();
    const { userdata: { _id, createdAt } } = useAppSelector(selectUser);   

    return _id ? (
        <Container maxWidth="xs" className="profile">
            <Paper elevation={10}>
                <Typography className="profile title" component="h2">
                    User Profile
                </Typography>
                <Typography sx={{ pb: 1 }}>
                    {`Created: ${format(
                        new Date(createdAt),
                        "dd LLL yyyy 'at' H:mm"
                    )}`}
                </Typography>
            </Paper>            
            <ProfileForm />
            <DeleteForm />
            <Button sx={{ m: 6 }} onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    ) : (
        <Navigate to="/" />
    );
};

export default ProfileList;
