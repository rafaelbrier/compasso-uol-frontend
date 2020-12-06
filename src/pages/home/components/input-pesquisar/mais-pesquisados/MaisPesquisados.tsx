import { ReactComponent as XIcon } from "bootstrap-icons/icons/x.svg";
import React, { useState } from "react";

export interface MaisPesquisadosProps {
    /**
     * Define se o dropdown de mais pesquiados deve ser exibido
     */
    inputFocused?: boolean;
    /**
     * Arrau de opções para exibir
     */
    options?: string[];
    /**
     * Setter callback para alterar o input
     */
    searchCallback?: (nome: string) => void;
    /**
     * Remove callback para remover um item mais pesquisado
     */
    removeCallback?: (nome: string) => void;
}

const MaisPesquisados: React.FC<MaisPesquisadosProps> = ({
    inputFocused,
    options,
    searchCallback,
    removeCallback,
}) => {
    const [open, setOpen] = useState<boolean>(Boolean(inputFocused));

    const hasOptions = options && options.length > 0;

    return (open || inputFocused) && hasOptions ? (
        <div
            className="position-absolute w-100 bg-white shadow px-3 pb-2"
            aria-labelledby="dropdownMenuLink"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <small className="pb-1">Mais pesquisados</small>
            {options?.map((opt: string) => (
                <div key={opt} className="d-flex-center-v">
                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => {
                            searchCallback && searchCallback(opt);
                            setOpen(false);
                        }}
                    >
                        {opt}
                    </button>
                    {removeCallback && (
                        <XIcon
                            className="cursor-pointer ml-auto"
                            fontSize={20}
                            onClick={() => removeCallback(opt)}
                            title="Remover item"
                        />
                    )}
                </div>
            ))}
        </div>
    ) : null;
};

export default MaisPesquisados;
