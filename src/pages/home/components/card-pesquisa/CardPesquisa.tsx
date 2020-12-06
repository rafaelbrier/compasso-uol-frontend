import clsx from "clsx";
import React from "react";
import classes from "./styles.module.scss";

export interface CardPesquisaProps {
    /**
     * Centraliza horizontalmente
     * @default false
     */
    centerX?: boolean;
    /**
     * Caminho da imagem do card
     */
    imageSrc?: string;
    /**
     * Alt da imagem caso exista
     */
    imageAlt?: string;
    /**
     * Altura da imagem
     * @default 128px
     */
    imageHeight?: string;
    /**
     * Altura da imagem
     * @default 128px
     */
    imageWidth?: string;
}
const CardPesquisa: React.FC<CardPesquisaProps> = ({
    children,
    centerX,
    imageSrc,
    imageAlt,
    imageHeight = 128,
    imageWidth = 128,
}) => {
    return (
        <div className={clsx(classes.card, "card", centerX && "mx-auto")}>
            <div className={clsx(classes.cardBody, "media p-4")}>
                <a href="https://github.com/">
                    <img
                        src={imageSrc}
                        className="mr-3 mb-2 mb-md-0"
                        alt={imageAlt}
                        height={imageHeight}
                        width={imageWidth}
                    />
                </a>
                <div className="media-body">{children}</div>
            </div>
        </div>
    );
};

export default CardPesquisa;
