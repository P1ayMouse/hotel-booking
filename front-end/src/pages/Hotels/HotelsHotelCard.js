import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeHotel } from "../../store/thunks/authThunk";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { PlaceOutlined, Star } from "@mui/icons-material";

import { FavoriteIcon, RightArrowIcon } from "../../components/CustomIcons";
import HotelFeature from "../../components/HotelFeature";
import styles from "./HotelsHotelCard.module.scss";

export default function HotelsHotelCard({hotel}) {
    const { t } = useTranslation();
    const likedHotels = useSelector(state => state.auth.user?.likedHotels || []);
    const dispatch = useDispatch();

    const isLiked = likedHotels.includes(hotel.id);

    const handleToggle = () => {
        dispatch(toggleLikeHotel(hotel.id));
    };

    return (
        <Box>
            <Card
                key={hotel.id}
                variant="outlined"
                className={styles.hotelCard}
                sx={{
                    backgroundColor: "var(--second-bg)"
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        image={hotel.image_url ? `/assets/img/hotels/${hotel.image_url}` : "/assets/img/none.png"}
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
                                {hotel.features.slice(0, 4).map((feature) => HotelFeature(feature))}
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
    );
}

HotelsHotelCard.propTypes = {
    hotel: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        image_url: PropTypes.string,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
        hotel_rating: PropTypes.number,
        price: PropTypes.number.isRequired,
    }).isRequired,
};
