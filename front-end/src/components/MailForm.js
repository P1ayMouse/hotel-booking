import { Formik, Form } from "formik";
import { TextField, Button, InputAdornment, FormHelperText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as yup from "yup";

export default function MailForm() {
    const { t } = useTranslation();
    const [message, setMessage] = useState("");

    const initialValues = { email: "" };

    const emailRegex = /^(?!\.)(?!.*\.\.)[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+){0,63}@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const validationSchema = yup.object({
        email: yup
            .string()
            .matches(emailRegex, t("invalidEmail"))
            .required(t("requiredEmail")),
    });

    function handleSubmit(values, { resetForm }) {
        setMessage(t("successSubscription", { email: values.email }));
        resetForm();
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className="mail-form">
                    <TextField
                        name="email"
                        fullWidth
                        placeholder={t("emailEnter")}
                        value={values.email}
                        onChange={e => {
                            if (message)
                            {setMessage("");}
                            handleChange(e);
                        }}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        className="mail-field"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className="newsletter-button"
                                        >
                                            {t("subscribe")}
                                        </Button>
                                    </InputAdornment>
                                )}
                        }}
                    />

                    {touched.email && errors.email && (
                        <FormHelperText className="status--error" style={{ fontStyle: "italic" }}>
                            {errors.email}
                        </FormHelperText>
                    )}

                    {message && !errors.email && (
                        <FormHelperText className="status--success" style={{ fontStyle: "italic" }}>
                            {message}
                        </FormHelperText>
                    )}
                </Form>
            )}
        </Formik>
    );
}
