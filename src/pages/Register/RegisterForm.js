import {Form, Field, ErrorMessage, Formik} from "formik";

export default function RegisterForm() {
    const registrationData = {
        name: '',
        surname: '',
        email: '',
        age: '',
        gender: '',
        preferences: {
            gaming: false,
            movies: false,
            music: false
        },
        advertising: ""
    };

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Name is required!";
        }
        else if (values.name.length < 3) {
            errors.name = "Name must be at least 3 characters long!";
        }

        if (!values.surname) {
            errors.surname = "Surname is required!";
        }
        else if (values.surname.length < 3) {
            errors.surname = "Surname must be at least 3 characters long!";
        }

        if (!values.email) {
            errors.email = "Email is required!";
        }
        else if (values.email.length < 11) {
            errors.email = "Email must be at least 11 characters long!";
        }
        else if (values.email.slice(-4) !== ".com") {
            errors.email = "Email must have .com in the name!";
        }

        if (!values.age) {
            errors.age = "Age is required!";
        }
        else if (values.age < 18) {
            errors.age = "You must be over 18!";
        }
        else if (values.age > 99) {
            errors.age = `You can't be over ${values.age}!`;
        }

        if (!values.gender) {
            errors.gender = "Gender is required!";
        }

        if (!values.advertising) {
            errors.advertising = "Advertising is required!";
        }

        return errors;
    }

    const handleSubmit = (values) => {
        console.log(values);
    }

    return (
        <Formik
            initialValues={ registrationData }
            validate={validate}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
                <Form className="todoForm">
                    <div className="column">
                        <div className="row">
                            <div className="fieldContainer">
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="First name"
                                    className="registrationField"
                                />
                                <ErrorMessage name="name" className="error" component="p" />
                            </div>
                            <div className="fieldContainer">
                                <Field
                                    type="text"
                                    name="surname"
                                    placeholder="Last name"
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
                                    placeholder='Email'
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
                                    placeholder='Age'
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
                                    <option value="" disabled hidden>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="another">Another</option>
                                </Field>
                                <ErrorMessage name='gender' className='error' component='p' />
                            </div>
                        </div>
                        <div className="checkboxContainer">
                            <h3>Preferences:</h3>
                            <label className="checkboxLabel">
                                <Field
                                    type='checkbox'
                                    name='preferences.gaming'
                                    className="checkboxField"
                                    checked={values.preferences.gaming}
                                />
                                Gaming
                            </label>
                            <label className="checkboxLabel">
                                <Field
                                    type='checkbox'
                                    name='preferences.movies'
                                    className="checkboxField"
                                    checked={values.preferences.movies}
                                />
                                Movies
                            </label>
                            <label className="checkboxLabel">
                                <Field
                                    type='checkbox'
                                    name='preferences.music'
                                    className="checkboxField"
                                    checked={values.preferences.music}
                                />
                                Music
                            </label>
                        </div>
                        <div className="radioContainer">
                            <h3>How did you hear about us?</h3>
                            <label>
                                <Field type="radio" name="advertising" value="relatives-friends"/>
                                Relatives/Friends
                            </label>
                            <label>
                                <Field type="radio" name="advertising" value="social"/>
                                Social
                            </label>
                            <label>
                                <Field type="radio" name="advertising" value="other"/>
                                Other
                            </label>
                            <ErrorMessage name='advertising' className='error' component='p' />
                        </div>
                        <button className="registrationButton" type="submit">Register</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}