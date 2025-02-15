import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {destinationsLoader} from "./loaders/destinationsLoader";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <div>Something went wrong!</div>,
        children: [
            {
              index: true,
              element: <Home/>,
              loader: destinationsLoader
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
