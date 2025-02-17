import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

import {
    AppBar, Toolbar, MenuItem, Typography, IconButton, Box, List, ListItemButton,
    ListItemText, ListItemIcon, Tooltip, Menu
} from "@mui/material";
import {
    LoginOutlined, LogoutOutlined, GitHub, LinkedIn, Email, AccountCircle, ManageAccounts, HowToRegOutlined,
} from "@mui/icons-material";

import { logout } from "../../store/slices/userSlices";

import LocalisationButton from "../LocalisationButton";

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

    const { t } = useTranslation();

    const loggedUserSettings = [
        {
            label: t("profile"),
            icon: <AccountCircle fontSize="small" />,
            onClick: () => {
                navigate("/profile");
                handleCloseUserMenu();
            },
        },
        {
            label: t("logout"),
            icon: <LogoutOutlined fontSize="small" />,
            onClick: () => {
                handleCloseUserMenu();
                dispatch(logout());
                navigate("/login");
            },
        },
    ];

    const unloggedUserSettings = [
        {
            label: t("register"),
            icon: <HowToRegOutlined fontSize="small" />,
            onClick: () => {
                navigate("/register");
                handleCloseUserMenu();
            },
        },
        {
            label: t("login"),
            icon: <LoginOutlined fontSize="small" />,
            onClick: () => {
                navigate("/login");
                handleCloseUserMenu();
            },
        },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
                                <ListItemText primary={t("home")} />
                            </ListItemButton>

                            <ListItemButton
                                component={NavLink}
                                to="/about"
                                selected={selectedKey === "/about"}
                            >
                                <ListItemText primary={t("about")} />
                            </ListItemButton>
                        </List>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <LocalisationButton />
                        <Tooltip title={t("openSettings")} arrow placement="bottom">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <ManageAccounts />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
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
