import clsx from "clsx";
import React from "react";

export interface CardPesquisaProps {
    /**
     * Width do Card
     * @default 75%
     */
    cardWidth?: string;
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
    cardWidth = "75%",
    centerX,
    imageSrc,
    imageAlt,
    imageHeight = 128,
    imageWidth = 128,
}) => {
    return (
        <div
            className={clsx("card", centerX && "mx-auto")}
            style={{ width: cardWidth }}
        >
            <div className="media p-4">
                <a href="https://github.com/">
                    <img
                        src={imageSrc}
                        className="mr-3"
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
