import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";
import { GitHub, Google, X } from "@mui/icons-material";

import "./Login.scss"
import LoginForm from "./LoginForm";
import {NavLink} from "react-router-dom";

export default function Login() {
    const { t } = useTranslation();
    return (
        <Box className="login-container">
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>{t("signIn")}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("doNotHaveAnAccount")}?
                    <Link variant="subtitle2" component={NavLink} to="/register" sx={{ ml: 0.5, textDecoration: "none" }}>
                        {t("getStarted")}
                    </Link>
                </Typography>
            </Box>

            <LoginForm />

            <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium', fontStyle: 'capitalize' }}
                >
                    {t("or")}
                </Typography>
            </Divider>

            <Box gap={1} display="flex" justifyContent="center">
                <IconButton color="inherit">
                    <Google />
                </IconButton>
                <IconButton color="inherit">
                    <GitHub />
                </IconButton>
                <IconButton color="inherit">
                    <X />
                </IconButton>
            </Box>
        </Box>
    );
}