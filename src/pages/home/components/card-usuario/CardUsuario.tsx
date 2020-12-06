import { ReactComponent as ArchiveFillIcon } from "bootstrap-icons/icons/archive-fill.svg";
import { ReactComponent as StarFillIcon } from "bootstrap-icons/icons/star-fill.svg";
import Button from "components/button/Button";
import React, { useMemo } from "react";
import UserResponse from "utils/types/UserResponse";

export interface CardUsuarioProps {
    /**
     * O Usuário
     */
    user?: UserResponse;
}

const CardUsuario: React.FC<CardUsuarioProps> = ({ user }) => {
    const title = useMemo(
        () => [user?.name, user?.company].filter(Boolean).join(" - "),
        [user]
    );

    return Boolean(user) ? (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4 my-auto">
                    <img
                        src={user?.avatar_url}
                        className="card-img"
                        alt="Avatar"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="card-title h5">
                            {title}{" "}
                            <p className="card-text">
                                <small className="text-muted">
                                    {user?.location}
                                </small>
                            </p>
                        </div>

                        <p className="card-text">{user?.bio}</p>

                        <div className="d-flex justify-content-around">
                            <Button
                                className="btn btn-outline-success"
                                startIcon={<ArchiveFillIcon />}
                                text="Repositórios"
                                title="Buscar repositórios"
                            />

                            <Button
                                className="btn btn-outline-warning ml-3"
                                startIcon={<StarFillIcon />}
                                text="Mais Visitados"
                                title="Buscar repositórios mais visitados"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default CardUsuario;
