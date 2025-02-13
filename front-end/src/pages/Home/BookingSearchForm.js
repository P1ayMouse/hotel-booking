import { Form, Field, ErrorMessage, Formik } from "formik";
import { Button, Box, MenuItem, TextField } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const destinations = [
    { value: 122, label: "Paris" },
    { value: 123, label: "London" },
    { value: 124, label: "New York" },
];

export default function BookingSearchForm() {
    const bookingSearchData = {
        destination: "",
        checkIn: null,
        checkOut: null,
        adults: 1,
        children: 0
    };

    const validate = (values) => {
        const errors = {};

        if (!values.destination) {
            errors.destination = "Destination is required!";
        }


        if (!values.adults) {
            errors.adults = "Required!";
        }
        if (values.adults > 5) {
            values.adults = 5;
        }
        else if (values.adults < 0) {
            values.adults = 1;
        }

        if (values.children > 5) {
            values.children = 5;
        }
        else if (values.children < 0) {
            values.children = 0;
        }

        if (!values.checkIn) {
            errors.checkIn = "Check-in date is required!";
        }

        if (!values.checkOut) {
            errors.checkOut = "Check-out date is required!";
        }

        if (values.checkIn > values.checkOut) {
            errors.checkOut = "Check-in date is bigger than check-out date!";
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
            {({ errors, touched, setFieldValue }) => (
                <Form style={{ display: "flex", gap: 22, alignItems: "center" }}>
                    <Box>
                        <Field
                            name="destination"
                            as={TextField}
                            select
                            label="Destination"
                            sx={{ width: "250px", height: "56px" }}
                            error={touched.destination && Boolean(errors.destination)}
                            helperText={<ErrorMessage name="destination" />}
                            SelectProps={{
                                "renderValue": (selected) => {
                                    const found = destinations.find((d) => d.value === selected);
                                    return found ? found.label : "";
                                },
                            }}
                        >
                            {destinations.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <LocationOnOutlined style={{ marginRight: 5 }} />
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Check In"
                                    value={bookingSearchData.checkIn}
                                    onChange={(newValue) => setFieldValue("checkIn", newValue)}
                                    slotProps={{
                                        textField: {
                                            sx: { width: "150px", height: "56px" },
                                            error: touched.checkIn && Boolean(errors.checkIn),
                                            helperText: errors.checkIn
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                        —
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Check Out"
                                    value={bookingSearchData.checkOut}
                                    onChange={(newValue) => setFieldValue("checkOut", newValue)}
                                    slotProps={{
                                        textField: {
                                            sx: { width: "150px", height: "56px" },
                                            error: touched.checkOut&& Boolean(errors.checkOut),
                                            helperText: errors.checkOut
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>

                    <Box>
                        <Field
                            name="adults"
                            as={TextField}
                            type="number"
                            label="Adults"
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
                            label="Children"
                            sx={{ width: "100px", height: "56px" }}
                            error={touched.children && Boolean(errors.children)}
                            helperText={<ErrorMessage name="children" />}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{ height: "56px" }}
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
