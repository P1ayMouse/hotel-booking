import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
    AppBar, Toolbar, Typography, IconButton, Box, List, ListItemButton, ListItemText, Button, Divider
} from "@mui/material";

import { logout } from "../../store/slices/authSlices";

import {ReactComponent as Logo} from "../../assets/img/Logo.svg";
import {ReactComponent as FooterLogo} from "../../assets/img/Logo-footer.svg";

import LocalisationButton from "../LocalisationButton";
import ThemeButton from "../ThemeButton";
import MailForm from "../MailForm";

import "./index.scss"
import { useEffect } from "react";
import { fetchUserProfile } from "../../store/thunks/authThunk";

export default function LayoutComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useSelector((state) => state.theme.theme);
    const user = useSelector((state) => state.auth.user);
    const selectedKey = location.pathname;

    const { t } = useTranslation();

    function handleLogout() {
        dispatch(logout());
        navigate("/login");
    }

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const pagesList = [
        {
            label: t("home"),
            key: "/",
        },
        {
            label: t("about"),
            key: "/about",
        },
        {
            label: t("services"),
            key: "/services",
        },
        {
            label: t("pricing"),
            key: "/pricing",
        },
        {
            label: "FAQ",
            key: "/faq",
        }
    ]

    const footerLinksList = [
        {
            label: t("quickLink"),
            links: [
                {
                    label: t("about"),
                    key: "/about"
                },
                {
                    label: t("deskSupport"),
                    key: "/desk-support"
                },
                {
                    label: t("services"),
                    key: "/services"
                }
            ]
        },
        {
            label: t("company"),
            links: [
                {
                    label: t("location"),
                    key: "/location"
                },
                {
                    label: t("ourMission"),
                    key: "/our-mission"
                },
                {
                    label: t("career"),
                    key: "/career"
                }
            ]
        },
        {
            label: t("legalTerms"),
            links: [
                {
                    label: t("privacy"),
                    key: "/privacy"
                },
                {
                    label: t("termsOfUse"),
                    key: "/terms-of-use"
                },
                {
                    label: "Cookies",
                    key: "/cookies"
                }
            ]
        }
    ]

    return (
        <Box className={`layout ${theme}`}>
            <AppBar position="static" className={`header ${theme}`}>
                <Toolbar className="toolbar">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton disableRipple={true} component={NavLink} to="/" className="logo">
                            <Logo />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "clamp(16px, 5vw, 96px)" }}>
                        <List sx={{ display: "flex" }}>
                            {pagesList.map((page) => (
                                <ListItemButton
                                    component={NavLink}
                                    to={page.key}
                                    selected={selectedKey === page.key}
                                    className="nav-button"
                                    key={page.key}
                                >
                                    <ListItemText primary={page.label} />
                                </ListItemButton>
                            ))}
                        </List>
                        {user ?
                            <Button onClick={handleLogout} className="button">
                                {t("logout")}
                            </Button>
                        :
                            <Button
                                onClick={() => navigate("/login")}
                                className="button"
                                variant="contained"
                            >
                                {t("login")}
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>

            <Box className="content">
                <Outlet />
            </Box>

            <Box component="footer" className={`footer ${theme}`}>
                <Box className="footer-container">
                    <Box className="newsletter">
                        <Box className="newsletter-text">
                            <Typography className="newsletter-title">
                                {t("joinOurNewsletter")}
                            </Typography>
                            <Typography className="newsletter-subtitle">
                                {t("noSpam")}
                            </Typography>
                        </Box>
                        <Box className="newsletter-form">
                            <MailForm />
                        </Box>
                    </Box>

                    <Divider className="footer-divider-1" orientation="horizontal" flexItem />

                    <Box className="brand-links-row">
                        <Box className="brand-block">
                            <Box className="brand-top">
                                <FooterLogo />
                                <ThemeButton />
                                <LocalisationButton />
                            </Box>
                            <Typography className="brand-description">
                                {t("jointVenture")}
                            </Typography>
                        </Box>

                        <Box className="links-list-container">
                            {footerLinksList.map((element) => (
                                <Box className="links-container" key={element.label}>
                                    <Typography className="links-title">
                                        {element.label}
                                    </Typography>
                                    {element.links.map((link) => (
                                        <Typography className="link" key={link.key}>
                                            {link.label}
                                        </Typography>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Divider className="footer-divider-2" orientation="horizontal" flexItem />

                    <Typography className="bottom-text">
                        © Copyright 2025 HOTEE. {t("rightsReserved")}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
