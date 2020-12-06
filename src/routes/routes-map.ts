import ROUTES_NAME from "./routes-name";

const ROUTES_MAP = [
    {
        path: "/:nomePesquisa?",
        exact: true,
        component: require("../pages/home/Home").default,
    },
    {
        path: ROUTES_NAME.HOME,
        exact: true,
        component: require("../pages/home/Home").default,
    },
    {
        path: "*",
        exact: true,
        component: require("../pages/error/ErrorPage404").default,
    },
];

export default ROUTES_MAP;
