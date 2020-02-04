import React from "react";
import { Switch, Route } from "react-router-dom";

const routes = [
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
    const routeMap = () => routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
    ));

    return (
        <Switch>
            {routeMap}
        </Switch>
    );
};

const RouteWithSubRoutes = (route) => (
    <Route
        path={route.path}
        render={(props) => (
            <route.component {...props} routes={route.routes} />
        )}
    />
);

export default RouteMap;
