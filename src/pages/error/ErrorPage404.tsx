import { ReactComponent as HouseFillIcon } from "bootstrap-icons/icons/house-fill.svg";
import * as React from "react";
import { Link } from "react-router-dom";
import ROUTES_NAME from "routes/routes-name";

export interface ErrorPage404Props {}

const ErrorPage404: React.FC<ErrorPage404Props> = () => {
    return (
        <div className="vh-100 d-flex-center-vh">
            <div className="jumbotron bg-light shadow my-lg-auto col-lg-8 col-12">
                <h1 className="display-4">Oops!</h1>
                <h1 className="display-5">A página procurada não existe!</h1>
                <p className="lead">404 - Not Found</p>
                <hr className="my-4" />
                <p>Verifique se digitou o endereço corretamente.</p>
                <Link
                    className="btn btn-outline-primary btn-lg d-flex-inline-center-v"
                    to={ROUTES_NAME.HOME}
                >
                    <HouseFillIcon />{" "}
                    <span className="pl-2">Voltar para Home</span>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage404;
