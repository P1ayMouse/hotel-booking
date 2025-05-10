import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {Box, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import uaFlag from "../../src/assets/icons/ukraine.png";
import enFlag from "../../src/assets/icons/united-kingdom.png";
import unknownFlag from "../../src/assets/icons/question-mark.png";

export default function LocalisationButton() {
    const languages = [
        { id: 1, code: "en", label: "English", flag: enFlag },
        { id: 2, code: "ua", label: "Українська", flag: uaFlag },
    ];

    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);

    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || { label: "Unknown", flag: unknownFlag };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (lang) => {
        if (lang) i18n.changeLanguage(lang);
        setAnchorEl(null);
    };

    return (
        <Box sx={{ alignSelf: 'center' }}>
            <Tooltip title={t("chooseLanguage")} arrow placement="bottom">
                <IconButton onClick={handleClick} sx={{ p: 0, borderRadius: "50%" }}>
                    <img
                        src={currentLanguage.flag}
                        alt={currentLanguage.label}
                        width="20"
                        height="20"
                    />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose(null)}
                sx={{ mt: "50px" }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {languages.map(language => (
                    language.code !== i18n.language &&
                    <MenuItem key={language.code} onClick={() => handleClose(language.code)}>
                        <img
                            src={language.flag}
                            alt={language.code}
                            width="20"
                            height="20"
                            style={{marginRight: "8px"}}
                        />
                        {language.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
