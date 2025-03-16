import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PlaceOutlined, Star } from "@mui/icons-material";

import { toggleLikeHotel } from "../../store/thunks/authThunk";
import { features } from "../../data/features";
import { FavoriteIcon, RightArrowIcon } from "../../components/CustomIcons";
import styles from "./HotelCard.module.scss";

export default function HotelCard({hotel}) {
    const { t } = useTranslation();
    const likedHotels = useSelector(state => state.auth.user?.likedHotels || []);
    const dispatch = useDispatch();

    const isLiked = likedHotels.includes(hotel.id);

    const renderFeature = (feature) => {
        const info = features.find(item => item.label === feature);
        if (!info) return null;
        return (
            <Typography key={info.key} className={styles.hotelFeature}>
                {info.icon}
                {feature}
            </Typography>
        );
    };

    const handleToggle = () => {
        dispatch(toggleLikeHotel(hotel.id));
    };

    return (
        <Box>
            <Card
                key={hotel.id}
                variant="outlined"
                className={styles.hotelCard}
            >
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        image={hotel.image_url ? `/assets/img/hotels/${hotel.image_url}` : `/assets/img/none.png`}
                        alt={hotel.name}
                        onError={(e) => e.target.src = "/assets/img/none.png"}
                        className={styles.cardImg}
                    />
                    <FavoriteIcon
                        className={styles.favoriteImg}
                        onClick={handleToggle}
                        sx={{background: isLiked ? "#7F2203" : "var(--Neutral-Black, #000)"}}
                    />
                </Box>

                <CardContent className={styles.cardContent}>
                    <Box className={styles.hotelHeaderInfo}>
                        <Box>
                            <Typography className={styles.hotelName} gutterBottom>
                                {hotel.name}
                            </Typography>
                            <Typography variant="body2" className={styles.hotelLocation}>
                                <PlaceOutlined sx={{ fontSize: "16px" }} />
                                {hotel.address}, {hotel.city} {hotel.state && `(${hotel.state})`}
                            </Typography>
                            <Box className={styles.hotelFeaturesContainer}>
                                {hotel.features.map((feature) => renderFeature(feature))}
                            </Box>
                        </Box>
                    </Box>

                    <Box className={styles.hotelBottomInfo}>
                        <Typography className={styles.hotelRating}>
                            <Star sx={{ color: "#F2AC0D" }} />
                            {hotel.hotel_rating || 0}
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="flex-end">
                            <Typography fontSize="24px" fontWeight="500">
                                {`$${hotel.price.toFixed(2)}`}
                            </Typography>
                            <Typography className={styles.taxesAndCharges}>
                                {t("taxesAndCharges")}
                            </Typography>
                            <Typography
                                component={NavLink}
                                to={`/hotels/hotel/${hotel.id}`}
                                className={styles.availability}
                            >
                                {t("availability")}
                                <RightArrowIcon sx={{ width: "14px", height: "12px" }} />
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

        </Box>
    )
}