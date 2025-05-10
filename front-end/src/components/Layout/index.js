import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
    AppBar, Toolbar, Typography, IconButton, Box, List, ListItemButton, ListItemText, Divider, Drawer
} from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import {ReactComponent as Logo} from "../../assets/img/Logo.svg";
import {ReactComponent as FooterLogo} from "../../assets/img/Logo-footer.svg";

import LocalisationButton from "../LocalisationButton";
import ThemeButton from "../ThemeButton";
import MailForm from "../MailForm";

import "./index.scss"
import {useEffect, useState} from "react";
import { fetchUserProfile } from "../../store/thunks/authThunk";
import AuthButton from "../AuthButton";

export default function LayoutComponent() {
    const dispatch = useDispatch();
    const location = useLocation();

    const theme = useSelector((state) => state.theme.theme);
    const user = useSelector((state) => state.auth.user);
    const selectedKey = location.pathname;

    const { t } = useTranslation();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    function toggleMobileMenu(open) {
        setMobileMenuOpen(open);
    }

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100 && isMobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobileMenuOpen]);

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
            label: t("hotels"),
            key: "/hotels",
        },
        {
            label: t("profile"),
            key: "/profile",
        },
        {
            label: t("favorite"),
            key: "/favorite-hotels",
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
        <Box data-theme={theme} className={"layout"}>
            <AppBar position="static" className="header" sx={{backgroundColor: "var(--primary-bg)"}}>
                <Toolbar className="toolbar">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton disableRipple={true} component={NavLink} to="/" className="logo">
                            {theme === "light" ? <Logo /> : <FooterLogo />}
                        </IconButton>
                    </Box>

                    <Box>
                        <MenuRoundedIcon
                            className="menu-icon"
                            onClick={() => toggleMobileMenu(true)}
                        />
                    </Box>

                    <Box className="nav-content">
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
                            <ListItemButton
                                disableRipple
                                disableTouchRipple
                                sx={{
                                    '&:hover': { backgroundColor: 'transparent', cursor: 'default' },
                                    marginLeft:"8px"
                                }}
                            >
                                <LocalisationButton />
                            </ListItemButton>
                            <ListItemButton
                                disableRipple
                                disableTouchRipple
                                sx={{
                                    '&:hover': { backgroundColor: 'transparent', cursor: 'default' },
                                }}
                            >
                                <ThemeButton />
                            </ListItemButton>
                            <AuthButton user={user} />
                        </List>
                    </Box>
                    <Drawer
                        anchor="left"
                        open={isMobileMenuOpen}
                        onClose={() => toggleMobileMenu(false)}
                        slotProps={{
                            paper:
                                {
                                    'data-theme': theme,
                                    sx: {backgroundColor: 'var(--primary-bg)', color: 'var(--primary-text)'}
                                }
                        }}
                    >
                        <Box sx={{ width: 250 }}>
                            <List>
                                {pagesList.map((page) => (
                                    <ListItemButton
                                        component={NavLink}
                                        to={page.key}
                                        selected={selectedKey === page.key}
                                        key={page.key}
                                    >
                                        <ListItemText primary={page.label} />
                                    </ListItemButton>
                                ))}
                            </List>
                            <Divider />
                            <Box sx={{ px: 2, pb: 2, mt: 2 }}>
                                <AuthButton user={user} fullWidth />
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <ListItemButton
                                    disableRipple
                                    disableTouchRipple
                                    sx={{
                                        justifyContent: "center",
                                        '&:hover': {backgroundColor: 'transparent', cursor: 'default'}
                                    }}
                                >
                                    <LocalisationButton />
                                </ListItemButton>
                                <ListItemButton
                                    disableRipple
                                    disableTouchRipple
                                    sx={{
                                        justifyContent: "center",
                                        '&:hover': {backgroundColor: 'transparent', cursor: 'default'}
                                    }}
                                >
                                    <ThemeButton />
                                </ListItemButton>
                            </Box>
                        </Box>
                    </Drawer>
                </Toolbar>
            </AppBar>

            <Box className="content">
                <Outlet />
            </Box>

            <Box component="footer" className="footer">
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
                                        <Typography
                                            component={NavLink}
                                            to={link.key}
                                            className="link"
                                            key={link.key}
                                        >
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
