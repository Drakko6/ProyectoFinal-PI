//Layouts

import LayoutBasic from "../layouts/LayoutBasic";
//Paginas
import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";
import Confirmation from "../pages/Confirmation";

const routes = [
  {
    path: "/",
    layout: LayoutBasic,
    component: Home,
    exact: true,
  },

  {
    path: "/user/confirm/:token",
    layout: LayoutBasic,
    component: Confirmation,
    exact: true,
  },

  {
    path: "/:username",
    layout: LayoutBasic,
    component: User,
    exact: true,
  },

  {
    layout: LayoutBasic,
    component: Error404,
  },
];

export default routes;
