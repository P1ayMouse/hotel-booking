import { Formik, Form } from "formik";

import { registerUser } from "../../store/thunks/authThunk";
import { clearError } from "../../store/slices/authSlices";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Button, TextField, MenuItem, InputAdornment, IconButton, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';

import * as yup from "yup";

export default function RegisterForm() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const error = useSelector((state) => state.auth.error);

    const data = {
        username: "",
        email: "",
        age: "",
        gender: "",
        password: ""
    };

    const emailRegex = /^(?!\.)(?!.*\.\.)[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+){0,63}@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(5, `${t("username")} ${t("minFiveChars")}`)
            .required(`${t("username")} ${t("isRequired")}`),
        email: yup
            .string()
            .matches(emailRegex, t("invalidEmail"))
            .required(`${t("emailAddress")} ${t("isRequired")}`),
        password: yup
            .string()
            .matches(passwordRegex, t("invalidPassword"))
            .required(`${t("password")} ${t("isRequired")}`),
        age: yup
            .number()
            .required(`${t("age")} ${t("isRequired")}`)
            .min(16, `${t("age")} ${t("mustBeOverSixteen")}`)
            .max(99, `${t("age")} ${t("cannotBeOver")} 99!`),
        gender: yup
            .string()
            .required(`${t("gender")} ${t("isRequired")}`)
    })

    const handleSubmit = async (values) => {
        const resultAction = await dispatch(registerUser(values));
        if (registerUser.fulfilled.match(resultAction)) {
            navigate('/login');
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [location.pathname]);

    return (
        <Formik
            key={i18n.language}
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                    {(error !== "invalid_token" && error) &&
                        <Alert severity="error" sx={{ mb: 6 }}>
                            {t(`server-errors.${error}`)}
                        </Alert>
                    }
                    <Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    className="register-field"
                                    name="username"
                                    label={t("username")}
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    className="register-field"
                                    name="password"
                                    label={t("password")}
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        sx={{color: 'var(--primary-text)'}}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    className="register-field"
                                    name="email"
                                    label={t("emailAddress")}
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    className="register-field"
                                    name="age"
                                    label={t("age")}
                                    type="number"
                                    value={values.age}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.age && Boolean(errors.age)}
                                    helperText={touched.age && errors.age}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    className="register-field"
                                    name="gender"
                                    label={t("gender")}
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.gender && Boolean(errors.gender)}
                                    helperText={touched.gender && errors.gender}
                                >
                                    <MenuItem id="male" value="male">{t("male")}</MenuItem>
                                    <MenuItem id="female" value="female">{t("female")}</MenuItem>
                                    <MenuItem id="another" value="another">{t("another")}</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        py: 1.5,
                                        backgroundColor: "#7F2203",
                                        textTransform: "none",
                                        fontWeight: "700",
                                    }}
                                >
                                    {t("register")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
