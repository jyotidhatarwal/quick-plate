import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import ResturantCardContainer from "./components/ResturantCardContainer";
import ResturantMenu from "./components/ResturnatMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import CustomHooks from "./components/CustomHooks";

const AppLayout = () => {
    return (
    <div id="app-layout">
        <Header />
        <Outlet />
    </div>
)};

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <ResturantCardContainer />,
            },
            {
                path: '/resturants/:resturantId',
                element: <ResturantMenu />,
            },
            {
                path: '/hook',
                element: <CustomHooks />
            }
        ]

    }
])



const container = ReactDOM.createRoot(document.getElementById("root"));

container.render(<RouterProvider router={appRouter} />);