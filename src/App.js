import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import ResturantCardContainer from "./components/ResturantCardContainer";
import ResturantMenu from "./components/ResturnatMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import CustomHooks from "./components/CustomHooks";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";

const AppLayout = () => {
    return (
        <Provider store={appStore}>
            <div id="app-layout">
                <Header />
                <Outlet />
            </div>
        </Provider>
)};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children:[
            {
                path: "/",
                element: <ResturantCardContainer/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/resturants/:resturantId",
                element: <ResturantMenu/>
            },
            {
                path: "/cart",
                element: <Cart/>
            },
        ],
        errorElement: <Error/>
    },
    {
        path: "/about",
        element: <About/>,
    },
    {
        path: "/contact",
        element: <Contact/>,
    }
])



const container = ReactDOM.createRoot(document.getElementById("root"));

container.render(<RouterProvider router={appRouter} />);