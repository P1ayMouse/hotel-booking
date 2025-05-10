import { useSelector } from "react-redux";
import {Box, Typography} from "@mui/material";

import "../styles/variables.scss";
import HotelCard from "../components/HotelCard";
import {useTranslation} from "react-i18next";

export default function FavoriteHotels() {
    const { t } = useTranslation();
    const { hotels } = useSelector((state) => state.hotel);
    const likedHotelsIds = useSelector((state) => state.auth.user.likedHotels);

    const likedHotels = hotels.filter(hotel => likedHotelsIds.includes(hotel.id));

    return (
        <Box maxWidth="1440px">
            <Typography style={{fontSize: "32px", fontWeight: 600, color: "var(--accent)", textAlign: "center", margin: "55px 0"}}>
                {t("favoriteHotels")}
            </Typography>

            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                margin: "10px 0 60px",
                flexWrap: "wrap",
                gap: "32px"
            }}>
                {likedHotels.map((hotel) => (
                    <HotelCard hotel={hotel} key={hotel.id} />
                ))}
            </Box>
        </Box>
    );
}