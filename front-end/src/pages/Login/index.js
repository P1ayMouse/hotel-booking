import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import "./Login.scss"

import {login} from "../../store/slices/userSlices";
import {Button} from "antd";
import {useTranslation} from "react-i18next";

export default function Login() {
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const from = location.state?.from || '/';

    const handleLogin = () => {
        dispatch(login())
        navigate(from, {replace: true});
    }

    return (
        <div
            style={{display: 'flex', flexDirection: 'column'}}
            className={`login-container`}
        >
            <h1> {t("login")} </h1>
            <Button onClick={handleLogin} className='login-button'>{t("login")}</Button>
        </div>
    )
}