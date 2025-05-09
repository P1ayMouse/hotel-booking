import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Hotel from "./pages/Hotel";
import Error404 from "./pages/Error404";
import FavoriteHotels from "./pages/FavoriteHotels";
import About from "./pages/About";
import Profile from "./pages/Profile";

import { hotelsAndDestinationsLoader } from "./loaders/hotelsAndDestinationsLoader";
import { hotelsLoader } from "./loaders/hotelsLoader";
import { userLoader } from "./loaders/userLoader";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <div>Something went wrong!</div>,
        children: [
            {
              index: true,
              element: <PrivateRoute><Home/></PrivateRoute>,
              loader: hotelsAndDestinationsLoader
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/hotels",
                element:
                    <PrivateRoute>
                        <Hotels/>
                    </PrivateRoute>,
                loader: hotelsAndDestinationsLoader
            },
            {
                path: "/hotels/hotel/:id",
                element:
                    <PrivateRoute>
                        <Hotel/>
                    </PrivateRoute>
            },
            {
                path: "/favorite-hotels",
                element:
                    <PrivateRoute>
                        <FavoriteHotels/>
                    </PrivateRoute>,
                loader: hotelsLoader
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile/></PrivateRoute>,
                loader: userLoader
            },
            {
                path: "*",
                element: <Error404/>,
            },
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
