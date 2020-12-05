import clsx from "clsx";
import React, { useMemo } from "react";

export interface ButtonProps {
    /**
     * Corpo do Botão
     */
    text: string;
    /**
     * Classe do botão
     * @default "btn btn-outline-secondary"
     */
    className?: string;
    /**
     * Define se o botão está em loading;
     */
    loading?: boolean;
    /**
     * Texto substituido no estado de loading;
     * @default "Buscando..."
     */
    loadingText?: string;
    /**
     * Define se o botão está desabilidade;
     */
    disabled?: boolean;
    /**
     * Ícone no final do botão
     */
    endIcon: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    text,
    className,
    loading,
    loadingText = "Buscando...",
    disabled,
    endIcon,
}) => {
    const Loading = useMemo(
        () =>
            loading && (
                <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                />
            ),
        [loading]
    );

    const EndIcon = useMemo(
        () =>
            (loading || endIcon) && (
                <div className="d-flex ml-2">{Loading || endIcon} </div>
            ),
        [Loading, loading, endIcon]
    );

    return (
        <button
            className={clsx(
                "d-flex-inline-center-v",
                className || "btn btn-outline-secondary"
            )}
            type="button"
            disabled={loading || disabled}
        >
            {loading ? loadingText : text}
            {EndIcon}
        </button>
    );
};

export default Button;