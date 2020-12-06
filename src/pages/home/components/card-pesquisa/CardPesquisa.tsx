import clsx from "clsx";
import homeClasses from "pages/home/home.module.scss";
import React from "react";

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
        <div className={clsx(homeClasses.card, "card", centerX && "mx-auto")}>
            <div className={clsx(homeClasses.cardBody, "media p-4")}>
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
