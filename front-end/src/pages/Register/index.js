import RegisterForm from "./RegisterForm";

import "./Register.scss"
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {NavLink} from "react-router-dom";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {GitHub, Google, X} from "@mui/icons-material";

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
    )
}