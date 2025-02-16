import RegisterForm from "./RegisterForm";

import "./Register.scss"

export default function Register() {
    return (
        <div
            style={{display: 'flex', flexDirection: 'column'}}
            className={`registrationContainer`}
        >
            <h1> Registration Page </h1>
            <RegisterForm />
        </div>
    )
}