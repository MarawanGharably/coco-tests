import React from "react";
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

const routesLayout = [
    {
        path: "/register",
        component: RegisterPage,
        routes: [
            {
                path: "/register/create-password",
                component: CreatePasswordPage
            },
            {
                path: "/register/create-profile",
                component: CreateProfilePage
            }
        ]
    },
    // Undefined create, will keep this here for understanding pattern
    // TODO: Uncomment and create dummy pages once definition is made
    // {
    //     path: "/create",
    //     component: StoreCreatePage
    // }
];

const RouteMap = () => {
    const routeMap = () => routesLayout.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
    ));

    return (
        <Switch>
            {routeMap()}
        </Switch>
    );
};

export default RouteMap;
