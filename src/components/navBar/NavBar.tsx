import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import NavBarMenu from "./NavBarMenu";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/reduxHooks";

import styles from "./navBar.module.scss";

const Base_URL = process.env.REACT_APP_BACKEND_URL;

const NavBar: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { userdata: { avatarURL, name } } = useAppSelector(selectUser);

    const userAvatarURL = avatarURL ? Base_URL + avatarURL : "/";

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" className={styles.navbar}>
                <Toolbar disableGutters>
                    <AssignmentTurnedInIcon sx={{ mr: 1 }} />
                    <Typography
                        component={RouterLink}
                        to={name ? "/" : "/login"}
                        className={styles.navbar__logo}
                    >
                        TodoList
                    </Typography>
                    {name &&
                        <>
                            <Typography sx={{ mr: 3 }}>{name}</Typography>
                            <Box>
                                <Tooltip title="Open settings" arrow>
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt={name || "TodoList"}
                                            src={userAvatarURL}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <Box
                                        sx={{ display: "block" }}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <NavBarMenu />
                                    </Box>
                                </Menu>
                            </Box>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
