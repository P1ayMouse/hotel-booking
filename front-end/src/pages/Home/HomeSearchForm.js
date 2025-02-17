import { Form, Field, ErrorMessage, Formik } from "formik";
import { Button, Box, TextField, Autocomplete } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import {useTranslation} from "react-i18next";

export default function HomeSearchForm() {
    const bookingSearchData = {
        destination: "",
        checkIn: "",
        checkOut: "",
        adults: 1,
        children: 0,
    };

    const { destinations, loading } = useSelector(
        (state) => state.destination) || { destinations: [], loading: false };

    const [query, setQuery] = useState("");
    const [filteredDestinations, setFilteredDestinations] = useState(destinations);

    const { t } = useTranslation();

    // Фільтрація пунктів призначення за введеним значенням.
    useEffect(() => {
        setFilteredDestinations(
            destinations
                .filter(
                    (destination) => destination.label.toLowerCase().startsWith(query.toLowerCase())
                )
        );
    }, [query]);

    const validate = (values) => {
        const errors = {};

        if (!values.destination) {
            errors.destination = "Destination is required!";
        }

        if (!values.checkIn) {
            errors.checkIn = "Check-in date is required!";
        }

        if (!values.checkOut) {
            errors.checkOut = "Check-out date is required!";
        }

        if (values.checkIn && values.checkOut && values.checkIn > values.checkOut) {
            errors.checkOut = "Check-in date cannot be later than check-out date!";
        }

        if (values.adults < 1) {
            values.adults = 1;
        }
        else if (values.adults > 5) {
            values.adults = 5;
        }

        if (values.children < 0) {
            values.children = 0;
        }
        else if (values.children > 5) {
            values.children = 5;
        }

        return errors;
    };

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={bookingSearchData}
            validate={validate}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, setFieldValue, values }) => (
                <Form style={{ display: "flex", gap: 22, alignItems: "center" }} >
                    <Box>
                        <Autocomplete
                            options={filteredDestinations.slice(0, 5)}
                            filterOptions={(options) => options}
                            getOptionLabel={(option) => option.label}
                            getOptionKey={(option) => option.value}
                            onInputChange={(e, newInputValue) => setQuery(newInputValue)}
                            onChange={(e, newValue) =>
                                setFieldValue("destination", newValue ? newValue.value : "")
                            }
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t("destination")}
                                    sx={{ width: "250px", height: "56px" }}
                                    error={touched.destination && Boolean(errors.destination)}
                                    helperText={touched.destination && errors.destination}
                                />
                            )}
                        />
                    </Box>

                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label={t("checkIn")}
                                value={values.checkIn ? dayjs(values.checkIn) : null}
                                onChange={(newValue) => setFieldValue("checkIn", newValue ? newValue.format("YYYY-MM-DD") : "")}
                                slotProps={{
                                    textField: {
                                        sx: { width: "180px", height: "56px" },
                                        error: touched.checkIn && Boolean(errors.checkIn),
                                        helperText: touched.checkIn && errors.checkIn,
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                    —
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label={t("checkOut")}
                                value={values.checkOut ? dayjs(values.checkOut) : null}
                                onChange={(newValue) => setFieldValue("checkOut", newValue ? newValue.format("YYYY-MM-DD") : "")}
                                slotProps={{
                                    textField: {
                                        sx: { width: "180px", height: "56px" },
                                        error: touched.checkOut && Boolean(errors.checkOut),
                                        helperText: touched.checkOut && errors.checkOut,
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box>
                        <Field
                            name="adults"
                            as={TextField}
                            type="number"
                            label={t("adults")}
                            sx={{ width: "100px", height: "56px" }}
                            error={touched.adults && Boolean(errors.adults)}
                            helperText={<ErrorMessage name="adults" />}
                        />
                    </Box>

                    <Box>
                        <Field
                            name="children"
                            as={TextField}
                            type="number"
                            label={t("children")}
                            sx={{ width: "100px", height: "56px" }}
                            error={touched.children && Boolean(errors.children)}
                            helperText={<ErrorMessage name="children" />}
                        />
                    </Box>

                    <Button type="submit" variant="outlined" sx={{ height: "56px" }}>
                        {t("submit")}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
