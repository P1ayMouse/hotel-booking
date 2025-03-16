import { Divider, IconButton, Typography, Box, Link } from "@mui/material";

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { FacebookIcon, GoogleIcon, XIcon } from "../../components/CustomIcons";
import RegisterForm from "./RegisterForm";
import "./Register.scss"

export default function Register() {
    const { t } = useTranslation();

    return (
        <Box className={`register-container`}>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>{t("registration")}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("haveAnAccount")}?
                    <Link variant="subtitle2" component={NavLink} to="/login" sx={{ ml: 0.5, textDecoration: "none" }}>
                        {t("signIn")}
                    </Link>
                </Typography>
            </Box>

            <RegisterForm />

            <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
                >
                    OR
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
    )
}