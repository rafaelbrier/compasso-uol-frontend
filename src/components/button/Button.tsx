import clsx from "clsx";
import React, { ButtonHTMLAttributes, useMemo } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
     * Ícone no início do botão
     */
    startIcon?: React.ReactNode;
    /**
     * Ícone no final do botão
     */
    endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    text,
    className = "btn btn-outline-secondary",
    loading,
    loadingText = "Buscando...",
    disabled,
    startIcon,
    endIcon,
    ...rest
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

    const StartIcon = useMemo(
        () => startIcon && <div className="d-flex mr-2">{startIcon} </div>,
        [startIcon]
    );

    return (
        <button
            className={clsx("d-flex-inline-center-v", className)}
            disabled={loading || disabled}
            {...rest}
        >
            {StartIcon}
            {loading ? loadingText : text}
            {EndIcon}
        </button>
    );
};

export default Button;
