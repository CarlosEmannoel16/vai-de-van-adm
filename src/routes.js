/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";

import DriverList from "views/ListDrivers";
import RoutePage from "views/Route";
import RouteList from "views/RoutesList";
import Driver from "views/Drivers";
import TravelList from "views/TravelsList";
import Travel from "views/Travels";
import ListVehicles from "views/ListVehicles";
import Vehicle from "views/Vehicle";
import TripStopList from "views/TripStopList";
import { FaCarAlt } from "react-icons/fa";

var routes = [
  {
    path: "dashboard",
    name: "Dashboard",
    icon: <FaCarAlt />,
    component: <Dashboard />,
    layout: "/",
    display: true,
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/",
  //   display: true,
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/",
  //   display: true,
  // },
  {
    path: "add/driver/:id?",
    name: "Cadastro de Motoristas",
    icon: FaCarAlt,
    component: <Driver />,
    layout: "/",
    display: false,
  },
  {
    path: "list/vehicles",
    name: "Veiculos",
    icon: FaCarAlt,
    component: <ListVehicles />,
    layout: "/",
    display: true,
  },
  {
    path: "/vehicle",
    name: "Veiculos",
    icon: FaCarAlt,
    component: <Vehicle />,
    layout: "/",
    display: false,
  },
  {
    path: "add/route/id?",
    name: "Rotas",
    icon: FaCarAlt,
    component: <RoutePage />,
    layout: "/",
    display: false,
  },
  {
    path: "routes",
    name: "Rotas",
    icon: FaCarAlt,
    component: <RouteList />,
    layout: "/",
    display: true,
  },
  {
    path: "travel",
    name: "Viagens",
    icon: FaCarAlt,
    component: <TravelList />,
    layout: "/",
    display: true,
  },
  {
    path: "add/travel/:id?",
    name: "Viagens",
    icon: FaCarAlt,
    component: <Travel />,
    layout: "/",
    display: false,
  },
  {
    path: "drivers",
    name: "Motoristas",
    icon: FaCarAlt,
    component: <DriverList />,
    layout: "/",
    display: true,
  },
  {
    path: "tripstop",
    name: "Paradas",
    icon: FaCarAlt,
    component: <TripStopList />,
    layout: "/",
    display: true,
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/",
  //   display: true,
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/",
  //   display: true,
  // },
];
export default routes;
