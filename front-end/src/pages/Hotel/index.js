import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchHotel } from "../../store/thunks/hotelsThunk";
import { Box, Typography, Button } from "@mui/material";

import "./Hotel.scss";
import HotelFeature from "../../components/HotelFeature";
import {useTranslation} from "react-i18next";

export default function Hotel() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { hotel, loading, error } = useSelector((state) => state.hotel);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchHotel(id));
    }, [id, dispatch]);

    if (loading) {return <Typography className="hotel-page__loading">{t("loading")}</Typography>;}
    if (error) {return <Typography className="hotel-page__error">{t(`server-errors.${error}`)}</Typography>;}

    const { name, phone_number, image_url, description, address, hotel_rating, price, features = [] } = hotel;
    const bgImage = image_url ? `/assets/img/hotels/${image_url}` : "/assets/img/none.png";

    return (
        <Box className="hotel-page" component="article">
            <Box
                className="hotel-page__banner"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <Box className="hotel-page__banner-overlay">
                    <Typography variant="h3" className="hotel-page__title" sx={{mb: 2}}>{name}</Typography>
                    <Typography variant="body1" className="hotel-page__address">{address}</Typography>
                </Box>
            </Box>

            <Box className="hotel-page__content">
                <Box className="hotel-page__about">
                    <Typography variant="h5"> {t("aboutHotel")}</Typography>
                    <Typography className="hotel-page__description">{description}</Typography>
                </Box>

                <Box className="hotel-page__details">
                    <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <Typography><strong>{t("rating")}:</strong> {hotel_rating} / 5</Typography>
                        <Typography><strong>{t("price")}:</strong> ${price}</Typography>
                        {phone_number &&
                            <Typography>
                                <strong>{t("phoneNumber")}: </strong>
                                <a href={`tel:${phone_number}`} className="hotel-page__details__phone-link">+{phone_number}</a>
                            </Typography>}
                    </Box>
                    <Button className="hotel-page__book-btn" variant="contained" sx={{mt: "24px"}}>{t("bookNow")}</Button>
                </Box>
            </Box>

            {features.length > 0 && (
                <Box className="hotel-page__features">
                    <Typography variant="h5">{t("features")}</Typography>
                    <Box className="hotel-page__features-list">
                        {features.map((feature) => (
                            <Box key={feature} className="hotel-page__feature-item">
                                {HotelFeature(feature)}
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
