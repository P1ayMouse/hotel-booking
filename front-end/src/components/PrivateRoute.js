import {Navigate, useLocation} from "react-router-dom";

import {useSelector} from "react-redux";

export default function PrivateRoute({ children }) {
    const location = useLocation();
    const { user, loading } = useSelector(state => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}