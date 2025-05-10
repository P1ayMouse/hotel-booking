import {IconButton, Divider, Link, Box, Typography} from "@mui/material";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {FacebookIcon, GoogleIcon, XIcon} from "../../components/CustomIcons";
import LoginForm from "./LoginForm";
import "./Login.scss";

export default function Login() {
    const { t } = useTranslation();
    return (
        <Box className="login-container">
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>{t("signIn")}</Typography>
                <Typography variant="body2" color="var(--primary-text)">
                    {t("doNotHaveAnAccount")}?
                    <Link variant="subtitle2" component={NavLink} to="/register" sx={{ ml: 0.5, textDecoration: "none" }}>
                        {t("getStarted")}
                    </Link>
                </Typography>
            </Box>

            <LoginForm />

            <Divider sx={{ my: 3, "&::before, &::after": { borderTopStyle: "dashed", borderColor: "var(--primary-text)" } }}>
                <Typography
                    variant="overline"
                    sx={{ color: "var(--primary-text)", fontWeight: "fontWeightMedium", fontStyle: "capitalize" }}
                >
                    {t("or")}
                </Typography>
            </Divider>

            <Box gap={1} display="flex" justifyContent="center">
                <IconButton color="inherit">
                    <FacebookIcon />
                </IconButton>
                <IconButton color="inherit">
                    <GoogleIcon />
                </IconButton>
                <IconButton color="inherit">
                    <XIcon />
                </IconButton>
            </Box>
        </Box>
    );
}