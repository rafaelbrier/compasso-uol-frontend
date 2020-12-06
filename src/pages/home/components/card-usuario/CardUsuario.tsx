import { getUserRepos, getUserStarred } from "api/git/services/users-service";
import { ReactComponent as ArchiveFillIcon } from "bootstrap-icons/icons/archive-fill.svg";
import { ReactComponent as StarFillIcon } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as XIcon } from "bootstrap-icons/icons/x.svg";
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
     * Limpa o usuário
     */
    clearUsuario?: (timeout?: number) => void;
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
        <div className="mt-3">
            <ErrorMessage
                hasError={Boolean(requestState.error)}
                clientMessage={{
                    404: "Repositórios não encontrados",
                    500: "Um erro desconhecido ocorreu na busca dos repositórios :(",
                }}
                status={requestState.status}
                serverMessage={requestState.error?.message}
                showServerMessage
            />
        </div>
    );
}

const CardUsuario: React.FC<CardUsuarioProps> = ({
    clearUsuario,
    reposRequest,
    starredRequest,
    user,
}) => {
    const title = useMemo(
        () => [user?.name, user?.company].filter(Boolean).join(" - "),
        [user]
    );

    const handleRepoClick = useCallback(() => {
        starredRequest.clear();
        reposRequest.run(() => getUserRepos(user?.login));
    }, [reposRequest, starredRequest, user]);

    const handleStarredClick = useCallback(() => {
        reposRequest.clear();
        starredRequest.run(() => getUserStarred(user?.login));
    }, [starredRequest, reposRequest, user]);

    const RequestError = useMemo(
        () =>
            requestMessageError(
                reposRequest.requestState.error
                    ? reposRequest.requestState
                    : starredRequest.requestState
            ),
        [reposRequest, starredRequest]
    );

    const CloseComponent = useMemo(
        () =>
            clearUsuario && (
                <XIcon
                    className="position-absolute cursor-pointer"
                    style={{ right: 0, zIndex: 1000 }}
                    fontSize={20}
                    onClick={() => clearUsuario()}
                    title="Fechar"
                />
            ),
        [clearUsuario]
    );

    return Boolean(user) ? (
        <div className="card mb-3 position-relative">
            {CloseComponent}
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

                        <p id="user-bio" className="card-text">
                            {user?.bio}
                        </p>

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
