import { ReactComponent as ForkIcon } from "assets/images/fork-icon.svg";
import { ReactComponent as ExclamationDiamondIcon } from "bootstrap-icons/icons/exclamation-diamond.svg";
import { ReactComponent as StarFillIcon } from "bootstrap-icons/icons/star-fill.svg";
import clsx from "clsx";
import homeClasses from "pages/home/home.module.scss";
import React, { useLayoutEffect, useRef } from "react";
import IMAGES_PATH from "utils/images-path";
import RepoResponse from "utils/types/RepoResponse";
import classes from "./styles.module.scss";

export interface CardListaRepoProps {
    /**
     * callback para pesquisar novamente
     */
    pesquisarNovamenteCallback?: () => void;
    /**
     * Define se é o repositório normal ou mais visitados
     */
    isMaisVisitados?: boolean;
    /**
     * Define se os repos foram buscados com sucesso
     */
    success?: boolean;
    /**
     * Array com os objetos de repositório
     */
    repos?: RepoResponse[];
    /**
     * Centraliza horizontalmente
     * @default false
     */
    centerX?: boolean;
}

function iconWithNumber(
    IconComponent: React.FunctionComponent,
    number: number,
    iconColor: string
) {
    const IconWrapper = function (props: any): JSX.Element {
        return <IconComponent {...props} />;
    };
    return (
        <div className="d-flex-inline-center-v justify-content-between">
            {number}
            <IconWrapper
                style={{ color: iconColor, marginLeft: 5, marginRight: 5 }}
            />
        </div>
    );
}

const CardListaRepo: React.FC<CardListaRepoProps> = ({
    pesquisarNovamenteCallback,
    isMaisVisitados,
    success,
    repos,
    centerX,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (success && scrollRef.current) {
            scrollRef?.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [success]);

    if (success) {
        const hasRepo = repos && repos.length > 0;
        return (
            <div
                ref={scrollRef}
                className={clsx(homeClasses.card, "card", centerX && "mx-auto")}
            >
                <div className={clsx(homeClasses.cardBody, "card-body")}>
                    <h5 className="card-title">Repositórios</h5>
                    {isMaisVisitados && (
                        <h6 className="card-subtitle mb-2 text-muted">
                            Mais Visitados
                        </h6>
                    )}
                    <ul className="list-group list-group-flush">
                        {hasRepo ? (
                            (repos || []).map((repo) => (
                                <li
                                    key={repo.full_name}
                                    className="position-relative list-group-item"
                                >
                                    <div className={classes.repoPath}>
                                        {repo.full_name}
                                    </div>
                                    <div className="d-lg-flex">
                                        <div className={classes.repoName}>
                                            {repo.name}
                                        </div>
                                        <div className="d-flex justify-content-around flex-fill text-center">
                                            {iconWithNumber(
                                                StarFillIcon,
                                                repo.stargazers_count,
                                                "#f5d02d"
                                            )}
                                            {iconWithNumber(
                                                ExclamationDiamondIcon,
                                                repo.open_issues,
                                                "red"
                                            )}
                                            {iconWithNumber(
                                                ForkIcon,
                                                repo.forks,
                                                "black"
                                            )}
                                        </div>
                                    </div>
                                    <div className={classes.repoPath}>
                                        {repo.description}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <>
                                <div className="card-body text-center">
                                    <img
                                        src={IMAGES_PATH.EMPTY}
                                        alt="Lista vazia"
                                        width={100}
                                    />

                                    <p className="card-text mt-5">
                                        O usuário não possui nenhum repositório!
                                    </p>
                                </div>
                            </>
                        )}
                    </ul>
                </div>
                <div className="card-footer text-muted text-center">
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() =>
                            pesquisarNovamenteCallback &&
                            pesquisarNovamenteCallback()
                        }
                    >
                        Pesquisar outro usuário
                    </button>
                </div>
            </div>
        );
    }
    return null;
};

export default CardListaRepo;
