import apiGit from "api/git/api-git";
import ENDPOINTS_GIT from "api/git/endpoints-git";
import { ReactComponent as ArchiveFillIcon } from "bootstrap-icons/icons/archive-fill.svg";
import { ReactComponent as StarFillIcon } from "bootstrap-icons/icons/star-fill.svg";
import clsx from "clsx";
import Button from "components/button/Button";
import ErrorMessage from "components/error-message/ErrorMessage";
import React, { useCallback, useMemo } from "react";
import { RequestStateRun, StateResponse } from "utils/hooks/useRequestState";
import ErrorResponse from "utils/types/ErrorResponse";
import RepoResponse from "utils/types/RepoResponse";
import UserResponse from "utils/types/UserResponse";
import classes from "./styles.module.scss";

export interface CardUsuarioProps {
    /**
     * Request Handler e Estado da busca de repositórios
     */
    reposRequest: RequestStateRun<RepoResponse[], ErrorResponse>;
    /**
     * Request Handler e Estado da busca de repositórios favoritos
     */
    starredRequest: RequestStateRun<RepoResponse[], ErrorResponse>;
    /**
     * O Usuário
     */
    user?: UserResponse;
}

function requestMessageError(
    requestState: StateResponse<RepoResponse[], ErrorResponse>
) {
    return (
        <ErrorMessage
            hasError={Boolean(requestState.error)}
            clientMessage="Repositórios não encontrados!"
            status={requestState.status}
            serverMessage={requestState.error?.message}
        />
    );
}

const CardUsuario: React.FC<CardUsuarioProps> = ({
    reposRequest,
    starredRequest,
    user,
}) => {
    const title = useMemo(
        () => [user?.name, user?.company].filter(Boolean).join(" - "),
        [user]
    );

    const handleRepoClick = useCallback(() => {
        reposRequest.run(() =>
            apiGit.get(ENDPOINTS_GIT.USER_REPO(user?.login))
        );
    }, [reposRequest, user]);

    const handleStarredClick = useCallback(() => {
        starredRequest.run(() =>
            apiGit.get(ENDPOINTS_GIT.USER_STARRED(user?.login))
        );
    }, [starredRequest, user]);

    const RequestError = useMemo(
        () =>
            requestMessageError(
                reposRequest.requestState || starredRequest.requestState
            ),
        [reposRequest, starredRequest]
    );

    return Boolean(user) ? (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-lg-4 my-auto">
                    <img
                        src={user?.avatar_url}
                        className={clsx(classes.cardImage, "card-img")}
                        alt="Avatar"
                    />
                </div>
                <div className="col-lg-8">
                    <div className="card-body pt-2 pt-lg-4">
                        <div className="card-title h5">
                            {title}
                            <p className="card-text">
                                <small className="text-muted">
                                    {user?.location}
                                </small>
                            </p>
                        </div>

                        <p className="card-text">{user?.bio}</p>

                        <div
                            className={clsx(
                                classes.btnContainer,
                                "d-flex justify-content-around"
                            )}
                        >
                            <Button
                                className="btn btn-outline-success"
                                startIcon={<ArchiveFillIcon />}
                                text="Repositórios"
                                title="Buscar repositórios"
                                onClick={handleRepoClick}
                                loading={reposRequest.requestState.isLoading}
                            />

                            <Button
                                className="btn btn-outline-warning ml-lg-3 mt-lg-0 mt-2"
                                startIcon={<StarFillIcon />}
                                text="Mais Visitados"
                                title="Buscar repositórios mais visitados"
                                onClick={handleStarredClick}
                                loading={starredRequest.requestState.isLoading}
                            />
                        </div>
                        {RequestError}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default CardUsuario;
