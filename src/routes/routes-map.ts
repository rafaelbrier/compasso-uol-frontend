const ROUTES_MAP = [
    {
        path: "/:nomePesquisa?",
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
