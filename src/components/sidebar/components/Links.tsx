/* eslint-disable */
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;
  let route = routes[0];
  let moddedRoute = [];
  moddedRoute.push(route);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    const flag =
      routeName.length === 0
        ? location.pathname === "/admin/" && true
        : location.pathname === "/admin/timeline"
        ? true
        : false;
    return flag;
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return <>{createLinks(moddedRoute)}</>;
};

export default SidebarLinks;
