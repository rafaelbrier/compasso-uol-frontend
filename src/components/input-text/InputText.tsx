import clsx from "clsx";
import React, { useMemo } from "react";

export interface InputTextProps {
    /**
     * Nome do input
     */
    name: string;
    /**
     *  Label do input
     */
    label?: string;
    /**
     *  Placeholder do input
     */
    placeholder?: string;
    /**
     * Classe do input
     */
    className?: string;
    /**
     * Botão final
     */
    endButton?: React.ReactNode;
}
const InputText: React.FC<InputTextProps> = ({
    name,
    label,
    className,
    placeholder,
    endButton,
}) => {
    const Label = useMemo(() => label && <label>{label}</label>, [label]);
    const EndButton = useMemo(
        () =>
            endButton && <div className="input-group-append">{endButton}</div>,
        [endButton]
    );

    return (
        <div className="form-group">
            {Label}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className={clsx("form-control", className)}
                    name={name}
                    placeholder={placeholder}
                    aria-label={placeholder}
                />
                {EndButton}
            </div>
        </div>
    );
};

export default InputText;
