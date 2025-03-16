import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Form, Formik } from "formik";
import { Button, Box, TextField, Autocomplete, Container, Typography, Paper, FormHelperText } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import * as yup from "yup";

import imageShowcase from "../../assets/img/image-showcase.jpg"

export default function HomeSearchForm() {
    const bookingSearchData = {
        destination: "",
        checkIn: "",
        checkOut: "",
    };

    const navigate = useNavigate();
    const { destinations } = useSelector(
        (state) => state.destination) || { destinations: [], loading: false };
    const [query, setQuery] = useState("");
    const [filteredDestinations, setFilteredDestinations] = useState(destinations);
    const { t, i18n } = useTranslation();

    // Фільтрація пунктів призначення за введеним значенням.
    useEffect(() => {
        setFilteredDestinations(
            destinations
                .filter(
                    (destination) => destination.label.toLowerCase().startsWith(query.toLowerCase())
                )
        );
    }, [query, destinations]);

    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();

    const validationSchema = yup.object().shape({
        destination: yup
            .string()
            .required(t("location") + " " + t("isRequired")),
        checkIn: yup
            .date()
            .nullable()
            .min(
                tomorrow,
                t("cannotBeLess") + " " + dayjs(tomorrow).format("D.MM.YYYY")
            )
            .test(
                'checkIn-required-if-checkOut',
                t("checkIn") + " " + t("isRequired"),
                function (value) {
                    const { checkOut } = this.parent;
                    return !(checkOut && !value);
                }
            )
            .test(
                'checkIn-max-checkOut',
                t("thereCanBeNoMore") + " " + t("checkOut"),
                function (value) {
                    const { checkOut } = this.parent;
                    return !(value && checkOut && dayjs(value).isAfter(dayjs(checkOut)));
                }
            ),
        checkOut: yup
            .date()
            .nullable()
            .min(
                tomorrow,
                t("cannotBeLess") + " " + dayjs(tomorrow).format("D.MM.YYYY")
            )
            .test(
                'checkOut-required-if-checkIn',
                t("checkOut") + " " + t("isRequired"),
                function (value) {
                    const { checkIn } = this.parent;
                    return !(checkIn && !value);
                }
            )
            .test(
                'checkOut-after-checkIn',
                t("thereCanBeNoLess") + " " + t("checkIn"),
                function (value) {
                    const { checkIn } = this.parent;
                    return !(value && checkIn && dayjs(value).isBefore(dayjs(checkIn)));
                }
            )
    });

    const handleSubmit = (values) => {
        const searchParams = new URLSearchParams();
        searchParams.append("destination", values.destination);
        if (values.checkIn) searchParams.append("checkIn", values.checkIn);
        if (values.checkOut) searchParams.append("checkOut", values.checkOut);

        navigate(`/hotels?${searchParams.toString()}`);
    };

    return (
        <Box
            className="banner"
            sx={{
                backgroundImage: {
                    md: `url('${imageShowcase}')`,
                },
            }}
        >
            <Container className="banner-container">
                <Box className="banner-text">
                    <Typography style={{fontSize: "60px", lineHeight: "72px"}} fontWeight={500} gutterBottom>
                        {t("homeBannerTextUp")}
                    </Typography>
                    <Typography style={{fontSize: "18px", lineHeight: "32px"}} fontWeight={200}>
                        {t("homeBannerTextDown")}
                    </Typography>
                </Box>

                <Paper className="form-paper" xs={{display: "flex", alignItems: "center"}}>
                    <Box>
                        <Typography style={{fontSize: "19px", fontWeight: 400}} gutterBottom>
                            {t("bookingHotel")}
                        </Typography>
                        <Typography style={{fontSize: "13px", fontWeight: 300}} color="#959493" gutterBottom>
                            {t("homeBookingHotelUnder")}
                        </Typography>
                    </Box>
                    <Formik
                        key={i18n.language}
                        initialValues={bookingSearchData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="form">
                                <Box>
                                    <Typography className="label" gutterBottom>
                                        {t("location")}
                                    </Typography>
                                    <Autocomplete
                                        freeSolo
                                        options={filteredDestinations.slice(0, 5)}
                                        filterOptions={(options) => options}
                                        getOptionLabel={(option) => option.label}
                                        getOptionKey={(option) => option.value}
                                        onInputChange={(e, newInputValue) => setQuery(newInputValue)}
                                        onChange={(e, newValue) =>
                                            setFieldValue("destination", newValue ? newValue.value : "")}
                                        className="field"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={touched.destination && Boolean(errors.destination)}
                                                placeholder={t("chooseCity")}
                                            />
                                        )}
                                    />
                                    {touched.destination && errors.destination && (
                                        <FormHelperText className="error">
                                            {errors.destination}
                                        </FormHelperText>
                                    )}
                                </Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Box display="flex" gap={2} mt={3}>
                                        <Box flex={1}>
                                            <Typography className="label" gutterBottom>
                                                {t("checkIn")}
                                            </Typography>
                                            <DatePicker
                                                className="field"
                                                format="D MMM YYYY"
                                                value={values.checkIn ? dayjs(values.checkIn) : null}
                                                onChange={(newValue) => setFieldValue("checkIn", newValue ? newValue.format("YYYY-MM-DD") : "")}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: touched.checkIn && Boolean(errors.checkIn),
                                                        placeholder: t("chooseDate"),
                                                    },
                                                }}
                                            />
                                            {touched.checkIn && errors.checkIn && (
                                                <FormHelperText className="error">
                                                    {errors.checkIn}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                        <Box flex={1}>
                                            <Typography className="label" gutterBottom>
                                                {t("checkOut")}
                                            </Typography>
                                            <DatePicker
                                                className="field"
                                                format="D MMM YYYY"
                                                value={values.checkOut ? dayjs(values.checkOut) : null}
                                                onChange={(newValue) => setFieldValue("checkOut", newValue ? newValue.format("YYYY-MM-DD") : "")}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: touched.checkOut && Boolean(errors.checkOut),
                                                        label: "",
                                                        placeholder: t("chooseDate"),
                                                    },
                                                }}
                                            />
                                            {touched.checkOut && errors.checkOut && (
                                                <FormHelperText className="error" flex={2}>
                                                    {errors.checkOut}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    </Box>
                                </LocalizationProvider>

                                <Button type="submit" variant="contained" className="button" fullWidth sx={{ mt: 5 }}>
                                    {t("discoverPlace")}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Box>
    );
}
