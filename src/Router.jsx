import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./molecules/layout/Layout";
import Login from "./pages/login/Login";
import Error404 from "./pages/error/Error404";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    children: [],
  },
  {
    path: "/",

    element: <Layout />,
    children: [
      { path: "", element: <Dashboard />, index: true },
   
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
