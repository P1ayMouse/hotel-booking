import { Form, Field, ErrorMessage, Formik } from "formik";
import { useTranslation } from "react-i18next";

export default function RegisterForm() {
    const { t } = useTranslation();

    const registrationData = {
        name: '',
        surname: '',
        email: '',
        age: '',
        gender: '',
    };

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = t("firstName") + " " + t("isRequired");
        }
        else if (values.name.length < 3) {
            errors.name = t("firstName") + " " + t("minThreeChars");
        }

        if (!values.surname) {
            errors.surname = t("lastName") + " " + t("isRequired");
        }
        else if (values.surname.length < 3) {
            errors.surname = t("lastName") + " " + t("minThreeChars");
        }

        if (!values.email) {
            errors.email = t("email") + " " + t("isRequired");
        }
        else if (values.email.length < 11) {
            errors.email = t("email") + " " + t("minElevenChars");
        }
        else if (values.email.slice(-4) !== ".com") {
            errors.email = t("email") + " " + t("mustContainDotCom");
        }

        if (!values.age) {
            errors.age = t("age") + " " + t("isRequired");
        }
        else if (values.age < 16) {
            errors.age = t("age") + " " + t("mustBeOverSixteen");
        }
        else if (values.age > 99) {
            errors.age = t("age") + ` ${t("cannotBeOver")} ${values.age}!`;
        }

        if (!values.gender) {
            errors.gender = t("gender") + " " + t("isRequired");
        }

        return errors;
    }

    const handleSubmit = (values) => {

        console.log(values);
    }

    return (
        <Formik
            initialValues={registrationData}
            validate={validate}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="todoForm">
                    <div className="column">
                        <div className="row">
                            <div className="fieldContainer">
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder={t("firstName")}
                                    className="registrationField"
                                />
                                <ErrorMessage name="name" className="error" component="p" />
                            </div>
                            <div className="fieldContainer">
                                <Field
                                    type="text"
                                    name="surname"
                                    placeholder={t("lastName")}
                                    className="registrationField"
                                />
                                <ErrorMessage name="surname" className="error" component="p" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="fieldContainer">
                                <Field
                                    type='email'
                                    name='email'
                                    placeholder={t("email")}
                                    className="registrationField"
                                />
                                <ErrorMessage name='email' className='error' component='p' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="fieldContainer">
                                <Field
                                    type='number'
                                    name='age'
                                    placeholder={t("age")}
                                    className="registrationField"
                                />
                                <ErrorMessage name='age' className='error' component='p' />
                            </div>
                            <div className="fieldContainer">
                                <Field
                                    as='select'
                                    name='gender'
                                    className="registrationField"
                                >
                                    <option value="" disabled hidden>{t("gender")}</option>
                                    <option value="male">{t("male")}</option>
                                    <option value="female">{t("female")}</option>
                                    <option value="another">{t("another")}</option>
                                </Field>
                                <ErrorMessage name='gender' className='error' component='p' />
                            </div>
                        </div>
                        <button className="registrationButton" type="submit">{t("register")}</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
