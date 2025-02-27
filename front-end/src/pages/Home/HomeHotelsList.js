import { Button, Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { PlaceOutlined, StarRate } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function HomeHotelsList() {
    const { hotels } = useSelector((state) => state.hotel);
    const { t } = useTranslation();

    function topRatedHotels() {
        return [...hotels].sort((a, b) => b.hotel_rating - a.hotel_rating).slice(0, 3);
    }

    return (
        <Box className="home-hotel-list">
            <Box className="top-info">
                <Box maxWidth="534px" width="100%">
                    <Typography style={{fontSize: "16px", fontWeight: 450, textTransform: "uppercase", color: "#7F2203"}}>
                        {t("recommendedHotel")}
                    </Typography>
                    <Typography style={{fontSize: "48px", fontWeight: 500, color: "#322F2A"}} mb={2}>
                        {t("monthHotels")}
                    </Typography>
                    <Typography style={{fontSize: "18px", fontWeight: 280, lineHeight: "32px", color: "#959493"}}>
                        {t("monthHotelsBottom")}
                    </Typography>
                </Box>
                <Button variant="contained" className="button">
                    {t("viewAll")}
                </Button>
            </Box>
            <Box className="hotels-list">
                {topRatedHotels().map((hotel) => (
                        <Card
                            key={hotel.id}
                            variant="outlined"
                            className="hotel-card"
                        >
                            <CardActionArea
                                component={NavLink} to={`/hotels/hotel/${hotel.id}`}
                            >
                                <CardContent className="card-content">
                                    <CardMedia
                                        component="img"
                                        className="card-img"
                                        image={hotel.image_url ? `/assets/img/hotels/${hotel.image_url}` : `/assets/img/none.png`}
                                        alt={hotel.name}
                                        onError={(e) => e.target.src = "/assets/img/none.png"}
                                    />
                                    <Box className="main-info">
                                        <Box>
                                            <Typography className="card-name" gutterBottom>
                                                {hotel.name}
                                            </Typography>
                                            <Typography variant="body2" display="flex" alignItems="center" color="#959493">
                                                <PlaceOutlined sx={{ fontSize: "20px", color: "#FEBD22", mr: 1 }} />
                                                {hotel.address}{hotel.state && `, ${hotel.state}`}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                                            <StarRate sx={{ fontSize: "20px", color: "#F2AC0D", marginBottom: 0.5 }} />
                                            {hotel.hotel_rating}
                                        </Typography>
                                    </Box>
                                    <Box className="hotel-price">
                                        {`$${hotel.price.toFixed(2)}`}
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                ))}
            </Box>
        </Box>
    );
}
