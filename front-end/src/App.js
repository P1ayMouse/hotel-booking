import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
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
              element: <Home/>,
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
                path: "hotels/hotel/:id",
                element: <Hotel/>
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
