import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { format } from "date-fns";

import { Button, Typography, Container, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "./ProfileFormValidation";
import AvatarForm from "./AvatarForm";
import DeleteDialog from "./DeleteDialog";
import { EmailField, NameField } from "components/userFields";
import UserMessage from "components/userMessage/UserMessage";

import { DeleteUser, UpdateUser } from "api/userrequests";
import { selectUser } from "store/selectors";
import { removeUser } from "store/userSlice";
import { useAppDispatch, useAppSelector } from "store/hook";

import "./profilelist.scss";

const ProfileList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState('');
    const [updateError, setUpdateError] = useState('');

    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userdata } = useAppSelector(selectUser);

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm(ProfileFormValidation);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [loaded]);

    useEffect(() => {
        reset({
            name: userdata.name,
            email: userdata.email,
        });
    }, [reset, userdata.email, userdata.name]);

    const onSubmit = (data: { name?: string, email?: string }): void => {
        const { name } = data;
        setLoading(true);
        setLoaded('');
        setUpdateError('')
        UpdateUser({ name })
            .then((response) => {
                console.log(response.message);
                setLoaded(response.message);
            })
            .catch((error) => {
                console.log(error.message);
                setUpdateError(error.response.data.message || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (): void => {
        setDeleteError('')
        DeleteUser()
            .then((response) => {
                console.log(response.message);
                sessionStorage.removeItem("rememberMe");
                localStorage.removeItem("rememberMe");
                dispatch(removeUser());
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.message);
                setDeleteError(error.response.data.message || error.message);
            })
            .finally(() => {
                setDeleting(false);
            });
    };

    return userdata._id ? (
        <Container maxWidth="xs" className="profile">
            <Paper elevation={10}>
                <Typography className="profile title" component="h2">
                    User Profile
                </Typography>
                <Typography sx={{ pb: 1 }}>
                    {`Created: ${format(
                        new Date(userdata.createdAt),
                        "dd LLL yyyy 'at' H:mm"
                    )}`}
                </Typography>
            </Paper>
            <Paper elevation={10} sx={{ mt: 1 }}>
                <Box sx={{ pt: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <EmailField
                        disabled={true}
                        error={errors.email}
                        control={control}
                    />

                    <NameField
                        label="Change your name"
                        error={errors.name}
                        control={control}
                    />
                    <UserMessage loading={loading} loaded={loaded} error={updateError} />
                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{ m: 3 }}
                    >
                        Save changes
                    </Button>
                </Box>
            </Paper>
            <Paper elevation={10}>
                <AvatarForm />
            </Paper>
            <Paper elevation={10}>
                <Typography className="profile subtitle">
                    Need to delete Profile?
                </Typography>
                <UserMessage loading={deleting} loaded={''} error={deleteError} />
                <DeleteDialog
                    buttonTitle={"delete user"}
                    dialogTitle={"You really want to delete user?"}
                    deleteAction={handleDelete}
                />
            </Paper>
            <Button sx={{ m: 6 }} onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    ) : (
        <Navigate to="/" />
    );
};

export default ProfileList;
