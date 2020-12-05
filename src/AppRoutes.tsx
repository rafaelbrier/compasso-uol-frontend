import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ROUTES_MAP from "routes/routes-map";

export interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = () => (
    <BrowserRouter>
        <Switch>
            {ROUTES_MAP.map(({ path, exact, component: Component }, index) => {
                return (
                    <Route key={index} path={path} exact={exact}>
                        <Component />
                    </Route>
                );
            })}
        </Switch>
    </BrowserRouter>
);

export default AppRoutes;
