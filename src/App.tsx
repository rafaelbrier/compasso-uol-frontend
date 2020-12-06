import AppRoutes from "AppRoutes";
import "assets/styles/bootstrap.css";
import "assets/styles/global.scss";
import React from "react";

export interface AppProps {}
const App: React.FC<AppProps> = () => {
    return (
        <div className="container">
            <AppRoutes />
        </div>
    );
};

export default App;
