import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <div>Something went wrong!</div>,
        children: [
            // {
            //   index: true,
            //   element: <Home/>
            // },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            }
        ]
    }
]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
