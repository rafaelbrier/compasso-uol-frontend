import React from "react";

export interface MaisPesquisadosProps {
    /**
     * Define se o dropdown de mais pesquiados deve ser exibido
     */
    show?: boolean;
    /**
     * Arrau de opções para exibir
     */
    options?: string[];
    /**
     * Setter callback para alterar o input
     */
    searchCallback?: (newVal: string) => void;
}

const MaisPesquisados: React.FC<MaisPesquisadosProps> = ({
    show,
    options,
    searchCallback,
}) => {
    const hasOptions = options && options.length > 0;

    return show && hasOptions ? (
        <div
            className="position-absolute w-100 bg-white shadow px-3 pb-2"
            aria-labelledby="dropdownMenuLink"
        >
            <small className="pb-1">Mais pesquisados</small>
            {options?.map((opt: string) => (
                <div key={opt}>
                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => searchCallback && searchCallback(opt)}
                    >
                        {opt}
                    </button>
                </div>
            ))}
        </div>
    ) : null;
};

export default MaisPesquisados;
