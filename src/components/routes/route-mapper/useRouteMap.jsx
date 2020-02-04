import React from "react";
import RouteWithSubRoutes from "../route-with-subroute/RouteWithSubRoutes";

// Reusable custom hook that renders routes
const useRouteMap = (routes) => routes && routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);

export default useRouteMap;
