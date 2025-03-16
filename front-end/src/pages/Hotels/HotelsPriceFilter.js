import { useTranslation } from "react-i18next";
import { Box, Button, InputAdornment, Slider, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./HotelsPriceFilter.module.scss";
import { ReactComponent as DollarIcon } from "../../assets/icons/Dollar.svg";
import { useSearchParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { Remove } from "@mui/icons-material";

export default function HotelsPriceFilter() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { hotels } = useSelector((state) => state.hotel);
    const hotelPriceArray = hotels.map((hotel) => hotel.price);
    const hotelMinPrice = Math.min(...hotelPriceArray);
    const hotelMaxPrice = Math.max(...hotelPriceArray);
    const priceDiff = 10;

    const price = searchParams.get("price")?.split("-").map(Number);
    const [sliderValue, setSliderValue] = useState(price || [hotelMinPrice, hotelMaxPrice]);

    const sliderHandleChange = (e, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;
        if (activeThumb === 0) {
            setSliderValue([Math.min(newValue[0], newValue[1] - priceDiff), newValue[1]]);
        } else {
            setSliderValue([newValue[0], Math.max(newValue[1], newValue[0] + priceDiff)]);
        }
    };

    const validatePrices = (values) => {
        const errors = {};
        if (values.minPrice < hotelMinPrice) {
            errors.minPrice = t("belowMinimum");
        }
        if (values.maxPrice > hotelMaxPrice) {
            errors.maxPrice = t("aboveMaximum");
        }
        if (values.maxPrice - values.minPrice < priceDiff) {
            errors.minPrice = t("diffMinMax", { num: priceDiff });
            errors.maxPrice = t("diffMinMax", { num: priceDiff });
        }
        return errors;
    };

    const handleSubmit = (values) => {
        setSliderValue([values.minPrice, values.maxPrice]);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("price", `${values.minPrice}-${values.maxPrice}`);
        newParams.delete("page");
        setSearchParams(newParams);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography className={styles.budgetSliderName}>
                {t("budgetPerNight")}
            </Typography>

            <Slider
                value={sliderValue}
                onChange={sliderHandleChange}
                valueLabelDisplay="auto"
                sx={{ color: "#500903", width: "100%" }}
                min={hotelMinPrice}
                max={hotelMaxPrice}
                disableSwap
            />

            <Formik
                enableReinitialize
                initialValues={{
                    minPrice: sliderValue[0],
                    maxPrice: sliderValue[1],
                }}
                validate={validatePrices}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, setFieldValue, values, handleBlur }) => (
                    <Form>
                        <Box display="flex" flexDirection="row" gap={1}>
                            <TextField
                                className={styles.priceField}
                                name="minPrice"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={values.minPrice}
                                onBlur={handleBlur}
                                onChange={(e) =>
                                    setFieldValue("minPrice", Number(e.target.value))
                                }
                                error={touched.minPrice && Boolean(errors.minPrice)}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <DollarIcon />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                    },
                                }}
                            />

                            <Remove sx={{ alignSelf: 'center', color: "#999" }} />

                            <TextField
                                className={styles.priceField}
                                name="maxPrice"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={values.maxPrice}
                                onBlur={handleBlur}
                                onChange={(e) =>
                                    setFieldValue("maxPrice", Number(e.target.value))
                                }
                                error={touched.maxPrice && Boolean(errors.maxPrice)}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <DollarIcon />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                    },
                                }}
                            />
                        </Box>

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#500903",
                                marginTop: "8px",
                                borderRadius: "8px",
                            }}
                        >
                            OK
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
