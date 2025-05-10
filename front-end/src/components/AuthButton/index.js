import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { logout } from "../../store/slices/authSlices";
import "./AuthButton.scss";

export default function AuthButton({ user, fullWidth = false }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <Button
            onClick={user ? handleLogout : () => navigate("/login")}
            className="auth-button"
            variant="contained"
            sx={{ width: fullWidth ? "100%" : "100px"}}
        >
            {user ? t("logout") : t("login")}
        </Button>
    );
}
