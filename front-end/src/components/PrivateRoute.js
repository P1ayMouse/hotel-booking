import {Navigate, useLocation} from 'react-router-dom';

import {useSelector} from "react-redux";

export default function PrivateRoute({ children }) {
    const location = useLocation();
    const isLogin = useSelector(state => state.user.isLogin);
    return isLogin ? children : <Navigate to='/login' replace state={{from: location.pathname}}/>;
}