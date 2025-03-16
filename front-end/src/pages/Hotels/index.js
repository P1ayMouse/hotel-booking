import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Box, Typography } from "@mui/material";

import HotelsList from "./HotelsList";
import "./Hotels.scss"
import HotelsTopFilter from "./HotelsTopFilter";
import HotelsLeftFilter from "./HotelsLeftFilter";

export default function Hotels() {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Box width="1224px">
            <Box marginTop={8} marginBottom={7}>
                <Typography color="#7F2203" fontSize="24px" fontWeight="700">
                    {t("comfortInHotels")}
                </Typography>
                <Typography color="#7F2203" fontSize="14px" fontWeight="300">
                    {t("exclusiveRewardsInEveryCorner")}
                </Typography>
            </Box>

            <HotelsTopFilter />

            <Box display="flex" flexDirection="row" gap="80px">
                <HotelsLeftFilter />
                <HotelsList />
            </Box>
        </Box>
    )
}