import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
    const location = useLocation();
    const { user, loading } = useSelector(state => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
