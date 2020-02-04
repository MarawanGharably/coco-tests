import React from "react";

import { Header, BodyWrapper, Footer } from "./layouts";
import { HomePage } from "./home-page";
import { RegisterPage } from "./register-page";
import { useRouteMap } from "./routes";

// Only needs to import CSS once at <App /> level. All imports for styling should happen in main.scss level from here on
import "./main.scss";

const routesLayout = [
    {
        path: "/",
        exact: true,
        component: HomePage
    },
    {
        path: "/register",
        exact: true,
        component: RegisterPage,
        // routes: [
        //     {
        //         path: "/register/create-password",
        //         component: CreatePasswordPage
        //     },
        //     {
        //         path: "/register/create-profile",
        //         component: CreateProfilePage
        //     }
        // ]
    },
    // Undefined create, will keep this here for understanding pattern
    // TODO: Uncomment and create dummy pages once definition is made
    // {
    //     path: "/create",
    //     component: StoreCreatePage
    // }
];

const App = () => {
    const routeRender = useRouteMap(routesLayout);
    return (
        <div className="app-container flex flex-column flex-1">
            <Header />
            <BodyWrapper>
                {routeRender}
            </BodyWrapper>
            <Footer />
        </div>
    );
};

export default App;
