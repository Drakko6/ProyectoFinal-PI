//Layouts

import LayoutBasic2 from "../layouts/LayoutBasic2";
//Paginas
import Auth from "../pages/Auth";
// import Error404 from "../pages/Error404";
import Confirmation from "../pages/Confirmation";

const routes2 = [
  {
    path: "/",
    layout: LayoutBasic2,
    component: Auth,
    exact: true,
  },

  {
    path: "/user/confirm/:token",
    layout: LayoutBasic2,
    component: Confirmation,
    exact: true,
  },
];

export default routes2;
