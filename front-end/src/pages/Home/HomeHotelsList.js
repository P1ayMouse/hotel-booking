import { Button, Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";
import HotelCard from "../../components/HotelCard";

export default function HomeHotelsList() {
    const { hotels } = useSelector((state) => state.hotel);
    const { t } = useTranslation();
    const navigate = useNavigate();

    function topRatedHotels() {
        return [...hotels].sort((a, b) => b.hotel_rating - a.hotel_rating).slice(0, 3);
    }

    return (
        <Box className="home-hotel-list">
            <Box className="top-info">
                <Box maxWidth="534px" width="100%">
                    <Typography style={{fontSize: "16px", fontWeight: 450, textTransform: "uppercase", color: "var(--accent)"}}>
                        {t("recommendedHotel")}
                    </Typography>
                    <Typography style={{fontSize: "48px", fontWeight: 500}} mb={2}>
                        {t("monthHotels")}
                    </Typography>
                    <Typography style={{fontSize: "18px", fontWeight: 280, lineHeight: "32px", color: "#959493"}}>
                        {t("monthHotelsBottom")}
                    </Typography>
                </Box>
                <Button variant="contained" className="button" onClick={() => {navigate("/hotels");}}>
                    {t("viewAll")}
                </Button>
            </Box>
            <Box className="hotels-list">
                {topRatedHotels().map((hotel) => (
                    <HotelCard hotel={hotel} key={hotel.id} />
                ))}
            </Box>
        </Box>
    );
}
