import RegisterForm from "./RegisterForm";

import "./Register.scss"
import {useTranslation} from "react-i18next";

export default function Register() {
    const { t } = useTranslation();

    return (
        <div
            style={{display: 'flex', flexDirection: 'column'}}
            className={`registrationContainer`}
        >
            <h1> {t("registration")} </h1>
            <RegisterForm />
        </div>
    )
}