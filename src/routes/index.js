import Home from "../pages/home";
import AnotherPage from "../pages/AnotherPage";

const routes = [
  {
    path: "/",
    name: "home",
    exact: true,
    component: Home,
  },
  {
    path: "/another",
    name: "another",
    component: AnotherPage,
  },
];

export default routes;
