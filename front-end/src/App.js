import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Hotel from "./pages/Hotel";

import { hotelsAndDestinationsLoader } from "./loaders/hotelsAndDestinationsLoader";

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
                    </PrivateRoute>
            },
            {
                path: "/hotels/hotel/:id",
                element:
                    <PrivateRoute>
                        <Hotel/>
                    </PrivateRoute>
            },
            {
                path: "*",
                element: <div>404</div>,
            },
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
