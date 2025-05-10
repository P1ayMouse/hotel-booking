import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import {Box, IconButton, Tooltip} from "@mui/material";
import {toggle} from "../store/slices/themeSlices";
import {LightMode, DarkMode} from "@mui/icons-material";

export default function ThemeButton() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {theme} = useSelector((state) => state.theme);

    const toggleTheme = () => {
        dispatch(toggle());
    };

    return (
        <Box>
            <Tooltip title={theme === "light" ? t("lightMode") : t("darkMode")}>
                <IconButton onClick={toggleTheme} sx={{color: theme === "light" ? "#212121FF": "#F5F5F5FF"}}>
                    {theme === "light" ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Tooltip>
        </Box>
    );
}
