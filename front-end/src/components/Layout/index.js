import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/userSlices";

import {
    AppBar, Toolbar, MenuItem, Typography, IconButton, Box, List, ListItemButton,
    ListItemText, ListItemIcon, Tooltip, Menu
} from "@mui/material";
import {
    Logout as LogoutIcon, GitHub, LinkedIn, Email, AccountCircle, Settings, Dashboard, ManageAccounts,
} from "@mui/icons-material";

export default function LayoutComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = useSelector((state) => state.user.isLogin);
    const selectedKey = isLogin ? location.pathname : "/login";

    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const loggedUserSettings = [
        {
            label: "Profile",
            icon: <AccountCircle fontSize="small" />,
            onClick: () => {
                navigate("/profile");
                handleCloseUserMenu();
            },
        },
        {
            label: "Account",
            icon: <Settings fontSize="small" />,
            onClick: () => {
                navigate("/account");
                handleCloseUserMenu();
            },
        },
        {
            label: "Dashboard",
            icon: <Dashboard fontSize="small" />,
            onClick: () => {
                navigate("/dashboard");
                handleCloseUserMenu();
            },
        },
        {
            label: "Logout",
            icon: <LogoutIcon fontSize="small" />,
            onClick: () => {
                handleCloseUserMenu();
                dispatch(logout());
                navigate("/login");
            },
        },
    ];

    const unloggedUserSettings = [
        {
            label: "Register",
            icon: <AccountCircle fontSize="small" />,
            onClick: () => {
                navigate("/register");
                handleCloseUserMenu();
            },
        },
        {
            label: "Login",
            icon: <Settings fontSize="small" />,
            onClick: () => {
                navigate("/login");
                handleCloseUserMenu();
            },
        },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* AppBar */}
            <AppBar position="static" color="default">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component={NavLink}
                            to="/"
                            sx={{
                                mr: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            LOGO
                        </Typography>
                        <List sx={{ display: "flex" }}>

                            <ListItemButton
                                component={NavLink}
                                to="/"
                                selected={selectedKey === "/"}
                            >
                                <ListItemText primary="Home" />
                            </ListItemButton>

                            <ListItemButton
                                component={NavLink}
                                to="/about"
                                selected={selectedKey === "/about"}
                            >
                                <ListItemText primary="About" />
                            </ListItemButton>
                        </List>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <ManageAccounts />
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
                            {(isLogin ? loggedUserSettings : unloggedUserSettings).map(({ label, icon, onClick }) => (
                                <MenuItem key={label} onClick={onClick}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <Typography textAlign="center">{label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <Outlet />
            </Box>

            <Box
                component="footer"
                sx={{ py: 2, textAlign: "center", mt: "auto", bgcolor: "grey.100" }}
            >
                <Typography variant="body2" color="textSecondary">
                    © 2025 Artem Ryzhenko
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <IconButton href="mailto:artem@ryzhenko.com" color="primary">
                        <Email />
                    </IconButton>
                    <IconButton
                        href="https://linkedin.com/in/artem-ryzhenko-886601172/"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                    >
                        <LinkedIn />
                    </IconButton>
                    <IconButton
                        href="https://github.com/P1ayMouse"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                    >
                        <GitHub />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
