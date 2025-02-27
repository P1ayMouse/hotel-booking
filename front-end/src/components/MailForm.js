import { Formik, Form } from "formik";
import { TextField, Button, InputAdornment, FormHelperText } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function MailForm() {
    const { t } = useTranslation();

    const initialValues = {
        email: "",
    };

    function handleSubmit(values) {
        console.log(values);
    }

    const emailRegex = /^(?!\.)(?!.*\.\.)[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+){0,63}@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .matches(emailRegex, t("invalidEmail"))
            .required(t("requiredEmail"))
    });

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
                        onChange={handleChange}
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
                        <FormHelperText className="error" style={{fontStyle: "italic"}}>
                            {errors.email}
                        </FormHelperText>
                    )}
                </Form>
            )}
        </Formik>
    );
}
