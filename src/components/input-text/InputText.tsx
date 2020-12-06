import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes, useMemo } from "react";

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     *  Label do input
     */
    label?: string;
    /**
     * Classe do input
     */
    className?: string;
    /**
     * Botão final
     */
    endButton?: React.ReactNode;
    /**
     * Componente de recomendação
     */
    recommendationComponent?: React.ReactNode;
}

const InputText = forwardRef<any, InputTextProps>(
    (
        {
            label,
            className,
            placeholder,
            endButton,
            recommendationComponent,
            value,
            ...rest
        },
        ref
    ) => {
        const Label = useMemo(() => label && <label>{label}</label>, [label]);
        const EndButton = useMemo(
            () =>
                endButton && (
                    <div className="input-group-append">{endButton}</div>
                ),
            [endButton]
        );
        const RecommendationComponent = useMemo(
            () =>
                recommendationComponent && (
                    <div className=" position-absolute fixed-bottom">
                        {recommendationComponent}
                    </div>
                ),
            [recommendationComponent]
        );

        return (
            <div className="form-group">
                {Label}
                <div className="input-group mb-3">
                    <input
                        ref={ref}
                        type="text"
                        className={clsx("form-control", className)}
                        aria-label={placeholder}
                        value={value || ""}
                        {...rest}
                    />
                    {EndButton}
                    {RecommendationComponent}
                </div>
            </div>
        );
    }
);

export default InputText;
