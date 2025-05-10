import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Form, Formik } from "formik";
import {
    Button, Box, Typography, FormHelperText, Select, MenuItem, InputAdornment,
    TextField, Autocomplete
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ReactComponent as Hotel } from "../../assets/icons/Hotel.svg";
import { ReactComponent as Calendar } from "../../assets/icons/Calendar.svg";
import styles from "./HotelsTopFilter.module.scss";

import dayjs from "dayjs";
import * as yup from "yup";

export default function HotelsTopFilter() {
    const { t, i18n } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const hotelsFilterData = {
        destination: Number(searchParams.get("destination")) || "",
        checkIn: searchParams.get("checkIn") || "",
        checkOut: searchParams.get("checkOut") || "",
        sortBy: searchParams.get("sortBy") || ""
    };

    const sortBy = {
        highRated: t("highRated"),
        lowRated: t("lowRated"),
        highPrice: t("highPrice"),
        lowPrice: t("lowPrice")
    };

    const { destinations } = useSelector(
        (state) => state.destination) || { destinations: [], loading: false };

    const [query, setQuery] = useState("");
    const [filteredDestinations, setFilteredDestinations] = useState(destinations);

    const [openCheckIn, setCheckInOpen] = useState(false);
    const [openCheckOut, setCheckOutOpen] = useState(false);

    // Фільтрація пунктів призначення за введеним значенням (destinations autocomplete)
    useEffect(() => {
        setFilteredDestinations(
            destinations
                .filter(
                    (destination) => destination.label.toLowerCase().startsWith(query.toLowerCase())
                )
        );
    }, [query, destinations]);

    const handleClear = () => {
        setQuery("");
        setSearchParams({});
    };

    const handleSortByChange = (event, setFieldValue, searchParams, setSearchParams) => {
        const newSortBy = event.target.value;
        setFieldValue("sortBy", newSortBy);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sortBy", newSortBy);
        setSearchParams(newParams);
    };

    const handleSubmit = (values) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("destination", values.destination);
        if (values.checkIn) {newParams.set("checkIn", values.checkIn);}
        if (values.checkOut) {newParams.set("checkOut", values.checkOut);}
        newParams.delete("page");
        setSearchParams(newParams);
    };

    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();
    const validationSchema = yup.object().shape({
        destination: yup
            .string()
            .required(`${t("location")  } ${  t("isRequired")}`),
        checkIn: yup
            .date()
            .nullable()
            .min(
                tomorrow,
                `${t("cannotBeLess")  } ${  dayjs(tomorrow).format("D.MM.YYYY")}`
            )
            .test(
                "checkIn-required-if-checkOut",
                `${t("checkIn")  } ${  t("isRequired")}`,
                function (value) {
                    const { checkOut } = this.parent;
                    return !(checkOut && !value);
                }
            )
            .test(
                "checkIn-max-checkOut",
                `${t("thereCanBeNoMore")  } ${  t("checkOut")}`,
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
                `${t("cannotBeLess")  } ${  dayjs(tomorrow).format("D.MM.YYYY")}`
            )
            .test(
                "checkOut-required-if-checkIn",
                `${t("checkOut")  } ${  t("isRequired")}`,
                function (value) {
                    const { checkIn } = this.parent;
                    return !(checkIn && !value);
                }
            )
            .test(
                "checkOut-after-checkIn",
                `${t("thereCanBeNoLess")  } ${  t("checkIn")}`,
                function (value) {
                    const { checkIn } = this.parent;
                    return !(value && checkIn && dayjs(value).isBefore(dayjs(checkIn)));
                }
            )
    });

    return (
        <Box className={styles.filterContainer}>
            <Formik
                key={i18n.language}
                enableReinitialize
                initialValues={hotelsFilterData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, setFieldValue, values, resetForm }) => (
                    <Form className={styles.form}>
                        <Box display="flex" flexDirection="column" gap={3}>
                            <Box display="flex" flexDirection="row" gap={3} width="100%">
                                <Box>
                                    <Typography gutterBottom>
                                        {t("location")}
                                    </Typography>
                                    <Autocomplete
                                        clearOnBlur
                                        freeSolo
                                        inputValue={query}
                                        options={filteredDestinations.slice(0, 5)}
                                        filterOptions={(options) => options}
                                        getOptionLabel={(option) => option.label || ""}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        value={
                                            destinations.find((destination) => destination.value === values.destination) || null
                                        }
                                        onInputChange={(e, newInputValue) => setQuery(newInputValue)}
                                        onChange={(e, newValue) =>
                                            setFieldValue("destination", newValue ? newValue.value : "")
                                        }
                                        className={styles.field}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={touched.destination && Boolean(errors.destination)}
                                                placeholder={t("chooseCity")}
                                                slotProps={{
                                                    input: {
                                                        ...params.InputProps,
                                                        startAdornment: (
                                                            <InputAdornment position="start" sx={{ marginLeft: "6px" }}>
                                                                <Hotel />
                                                            </InputAdornment>
                                                        ),
                                                    }
                                                }}
                                            />
                                        )}
                                    />

                                    {touched.destination && errors.destination && (
                                        <FormHelperText className="status--error">
                                            {errors.destination}
                                        </FormHelperText>
                                    )}
                                </Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Box>
                                        <Typography gutterBottom>
                                            {t("checkIn")}
                                        </Typography>
                                        <DatePicker
                                            className={styles.field}
                                            format="D MMM YYYY"
                                            open={openCheckIn}
                                            onOpen={() => setCheckInOpen(true)}
                                            onClose={() => setCheckInOpen(false)}
                                            value={values.checkIn ? dayjs(values.checkIn) : null}
                                            onChange={(newValue) =>
                                                setFieldValue("checkIn", newValue ? newValue.format("YYYY-MM-DD") : "")
                                            }
                                            slotProps={{
                                                textField: {
                                                    error: touched.checkIn && Boolean(errors.checkIn),
                                                    placeholder: t("chooseDate"),
                                                    InputProps: {
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Calendar />
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: null,
                                                    },
                                                    onClick: () => setCheckInOpen(true),
                                                },
                                            }}
                                        />
                                        {touched.checkIn && errors.checkIn && (
                                            <FormHelperText className="status--error">
                                                {errors.checkIn}
                                            </FormHelperText>
                                        )}
                                    </Box>
                                    <Box>
                                        <Typography gutterBottom>
                                            {t("checkOut")}
                                        </Typography>
                                        <DatePicker
                                            className={styles.field}
                                            format="D MMM YYYY"
                                            open={openCheckOut}
                                            onOpen={() => setCheckOutOpen(true)}
                                            onClose={() => setCheckOutOpen(false)}
                                            value={values.checkOut ? dayjs(values.checkOut) : null}
                                            onChange={(newValue) =>
                                                setFieldValue("checkOut", newValue ? newValue.format("YYYY-MM-DD") : "")
                                            }
                                            slotProps={{
                                                textField: {
                                                    error: touched.checkOut && Boolean(errors.checkOut),
                                                    placeholder: t("chooseDate"),
                                                    InputProps: {
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Calendar />
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: null,
                                                    },
                                                    onClick: () => setCheckOutOpen(true),
                                                },
                                            }}
                                        />
                                        {touched.checkOut && errors.checkOut && (
                                            <FormHelperText className="error" flex={2}>
                                                {errors.checkOut}
                                            </FormHelperText>
                                        )}
                                    </Box>
                                </LocalizationProvider>
                            </Box>
                            <Select
                                variant="outlined"
                                className={styles.field}
                                value={values.sortBy}
                                onChange={(e) =>
                                    handleSortByChange(e, setFieldValue, searchParams, setSearchParams)
                                }
                                displayEmpty
                                IconComponent={() => null}
                                renderValue={(selected) =>
                                    selected === ""
                                        ? `${t("filterBy")}: ${t("chooseIt")}`
                                        : `${t("filterBy")}: ${sortBy[selected]}`
                                }
                            >
                                {Object.entries(sortBy).map(([key, value]) => (
                                    <MenuItem key={key} value={key}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box display="flex" flexDirection="column" gap={3} width="100%">
                            <Button type="submit" variant="contained" style={{marginTop: "30px"}} className={styles.button}>
                                {t("search")}
                            </Button>
                            <Button onClick={() => handleClear(resetForm)} variant="contained" className={styles.button}>
                                {t("clear")}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
