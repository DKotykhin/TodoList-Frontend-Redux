import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

import { Button, Typography, Container } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "./ProfileFormValidation";
import AvatarForm from "./AvatarForm";
import DeleteDialog from "./DeleteDialog";
import { EmailField, NameField } from "components/userFields";

import { DeleteUser, UpdateUser } from "api/userrequests";
import { selectUser } from "store/selectors";
import { removeUser } from "store/userSlice";
import { useAppDispatch, useAppSelector } from "store/hook";

import "./profileList.scss";

const ProfileList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userdata: { user, token } } = useAppSelector(selectUser);

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm(ProfileFormValidation);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, [loaded]);

    useEffect(() => {
        reset({
            name: user.name,
            email: user.email,
        });
    }, [reset, user.email, user.name]);

    const handleDelete = (data: string): void => {
        DeleteUser(data)
            .then((response) => {
                console.log(response.message);
                sessionStorage.removeItem("rememberMe");
                localStorage.removeItem("rememberMe");
                dispatch(removeUser());
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const onSubmit = (data: { name?: string, email?: string }): void => {
        const { name } = data;
        setLoading(true);
        UpdateUser({ name }, token)
            .then((response) => {
                console.log(response.message);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="xs" className="profile">
            <Typography className="profile title" component="h2">
                User Profile
            </Typography>
            <Typography>
                {`Created: ${format(
                    new Date(user.createdAt),
                    "dd LLL yyyy 'at' H:mm"
                )}`}
            </Typography>
            <Box
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

                <Typography className="profile message">
                    {loading ? "Loading..." : ""}
                    {loaded ? "Profile update successfully!" : ""}
                </Typography>
                <Button
                    type="submit"
                    variant="outlined"
                    className="profile save_button"
                >
                    Save changes
                </Button>
            </Box>
            <AvatarForm />
            <Typography>
                Need to delete Profile?
            </Typography>
            <DeleteDialog
                buttonTitle={"delete user"}
                dialogTitle={"You really want to delete user?"}
                deleteAction={() => handleDelete(token)}
            />
            <Button className="profile save_button" onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    );
};

export default ProfileList;
