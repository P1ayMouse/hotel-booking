import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Box, Typography, IconButton, Drawer, useMediaQuery } from "@mui/material";

import HotelsList from "./HotelsList";
import HotelsTopFilter from "./HotelsTopFilter";
import HotelsLeftFilter from "./HotelsLeftFilter";
import "./Hotels.scss";
import { MenuRounded } from "@mui/icons-material";

export default function Hotels() {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const isMobile = useMediaQuery("(max-width:950px)");
    const theme = useSelector((state) => state.theme.theme);

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleDrawer = (open) => () => setMobileMenuOpen(open);

    useEffect(() => {
        const handleResize = () => {
            if (isMobile && isMobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobileMenuOpen, isMobile]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Box
            sx={{
                width: { xs: "100%", sm: "90%", md: 1200 },
                mx: "auto",
                mt: { xs: 4, md: 8 },
                mb: { xs: 4, md: 7 },
            }}
        >
            <Box mb={{ xs: 3, md: 7 }}>
                <Typography
                    color="var(--accent)"
                    fontSize={{ xs: "20px", md: "24px" }}
                    fontWeight="700"
                >
                    {t("comfortInHotels")}
                </Typography>
                <Typography
                    color="var(--accent)"
                    fontSize={{ xs: "12px", md: "14px" }}
                    fontWeight="300"
                >
                    {t("exclusiveRewardsInEveryCorner")}
                </Typography>
            </Box>

            <HotelsTopFilter />

            {isMobile ? (
                <>
                    <IconButton disableRipple onClick={toggleDrawer(true)} sx={{ color: "var(--primary-text)", mb: 2 }} >
                        <MenuRounded sx={{ mr: 1 }} /> Filter
                    </IconButton>
                    <Drawer
                        disableScrollLock
                        anchor="left"
                        open={isMobileMenuOpen}
                        onClose={toggleDrawer(false)}
                        slotProps={{
                            paper:
                                {
                                    "data-theme": theme,
                                    sx: {backgroundColor: "var(--primary-bg)", color: "var(--primary-text)"}
                                }
                        }}
                    >
                        <Box sx={{ width: 250, p: 2 }}>
                            <HotelsLeftFilter />
                        </Box>
                    </Drawer>
                    <HotelsList />
                </>
            ) : (
                <Box display="flex" flexDirection="row" gap="80px">
                    <Box sx={{ minWidth: 250 }}>
                        <HotelsLeftFilter />
                    </Box>
                    <Box flex={1}>
                        <HotelsList />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
