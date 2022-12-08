import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import NavBarMenu from "./NavBarMenu";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

import "./navBar.scss";

const NavBar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { userdata: { token, user } } = useAppSelector(selectUser);

    const userName = token ? user.name : "";
    const userAvatarURL = token ? user.avatarURL : "";

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" className="navbar">
                <Toolbar disableGutters>
                    <AssignmentTurnedInIcon sx={{ mr: 1 }} />
                    <Typography
                        component={RouterLink}
                        to="/"
                        className="navbar_link_text"
                    >
                        TodoList
                    </Typography>
                    <Typography sx={{ mr: 3 }}>{userName}</Typography>
                    <Box>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt={userName || "TodoList"}
                                    src={`https://todolist-new17.herokuapp.com/api${userAvatarURL}` || '/'}
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
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
