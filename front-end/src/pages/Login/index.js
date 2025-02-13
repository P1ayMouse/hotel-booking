import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import "./Login.css"

import {login} from "../../store/slices/userSlices";
import {Button} from "antd";

export default function Login() {
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

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
            <h1> Login </h1>
            <Button onClick={handleLogin} className='login-button'>Log In</Button>
        </div>
    )
}