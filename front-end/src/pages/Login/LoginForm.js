import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {Box, Button, Link, InputAdornment, IconButton, TextField, Alert} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, Formik } from "formik";
import * as yup from "yup";

import {loginUser} from "../../store/thunks/authThunk";
import {clearError} from "../../store/slices/authSlices";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);

    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const from = location.state?.from || "/";

    const userInfo = {
        email: "example@gmail.com",
        password: "example1",
    };

    const emailRegex = /^(?!\.)(?!.*\.\.)[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+){0,63}@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .matches(emailRegex, t("invalidEmail"))
            .required(`${t("emailAddress")} ${t("isRequired")}`),
        password: yup
            .string()
            .required(`${t("password")} ${t("isRequired")}`)
    });

    const handleLogin = async (values) => {
        const resultAction = await dispatch(loginUser(values));
        if (loginUser.fulfilled.match(resultAction)) {
            navigate(from, {replace: true});
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [location.pathname]);

    return (
        <Formik
            key={i18n.language}
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={(values) => handleLogin(values)}
        >
            {({ errors, touched, values, handleChange }) => (
                <Form>
                    {(error !== "invalid_token" && error) &&
                        <Alert severity="error" sx={{ mb: 6 }}>
                            {t(`server-errors.${error}`)}
                        </Alert>
                    }
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <TextField
                            fullWidth
                            className="login-field"
                            name="email"
                            label={t("emailAddress")}
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ mb: 3 }}
                        />

                        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
                            {t("forgotPassword")}?
                        </Link>

                        <TextField
                            fullWidth
                            className="login-field"
                            name="password"
                            label={t("password")}
                            type={showPassword ? "text" : "password"}
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
                                                sx={{color: "var(--primary-text)"}}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            className="login-button"
                        >
                            {t("signInButton")}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}