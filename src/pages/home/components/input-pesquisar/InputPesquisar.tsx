import apiGit from "api/git/api-git";
import ENDPOINTS_GIT from "api/git/endpoints-git";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import Button from "components/button/Button";
import InputText from "components/input-text/InputText";
import React, { useCallback, useState } from "react";
import {
    CallbackReturnType,
    CbROptions,
    StateResponse,
} from "utils/hooks/useRequestState";
import ErrorResponse from "utils/types/ErrorResponse";
import UserResponse from "utils/types/UserResponse";
import MaisPesquisados from "./mais-pesquisados/MaisPesquisados";
import useMaisPesquisados from "./mais-pesquisados/useMaisPesquisados";
import useInputPesquisar from "./useInputPesquisar";

export interface InputPesquisarProps {
    /**
     * Callback para pesquisar usuário
     */
    run: (
        callback: CallbackReturnType,
        options?: CbROptions
    ) => Promise<StateResponse<UserResponse, ErrorResponse>>;
    /**
     * Estado de carregamento da requisição
     */
    isLoading?: boolean;
}

function filterOptions(options: string[], val?: string): string[] {
    return options.filter((opt) => (val ? opt.includes(val) : true));
}

function blurField(setInputFocused: (val: boolean) => void) {
    setTimeout(() => setInputFocused && setInputFocused(false), 100);
}

const InputPesquisar: React.FC<InputPesquisarProps> = ({ run, isLoading }) => {
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const { options, set: setMaisPesquisados } = useMaisPesquisados();

    const handlePesquisarClick = useCallback(
        async (_nome?: string) => {
            const response = await run(() =>
                apiGit.get(ENDPOINTS_GIT.USER(_nome))
            );
            if (response.success) setMaisPesquisados(_nome);
        },
        [run, setMaisPesquisados]
    );

    const { nome, setNome } = useInputPesquisar(handlePesquisarClick);
    const handleMaisPesquisadoClick = useCallback(
        (_nome?: string) => {
            handlePesquisarClick(_nome);
            setNome(_nome);
        },
        [handlePesquisarClick, setNome]
    );

    return (
        <div className="mt-3">
            <InputText
                name="nome"
                label="Nome do usuário"
                placeholder="Ex.: rafaelbrier"
                value={nome}
                onChange={({ target: { value } }) => setNome(value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => blurField(setInputFocused)}
                endButton={
                    <Button
                        className="btn btn-info"
                        text="Pesquisar"
                        title="Pesquisar"
                        loading={isLoading}
                        onClick={() => handlePesquisarClick(nome)}
                        disabled={!Boolean(nome)}
                        endIcon={<SearchIcon />}
                    />
                }
                recommendationComponent={
                    <MaisPesquisados
                        options={filterOptions(options, nome)}
                        show={inputFocused}
                        searchCallback={handleMaisPesquisadoClick}
                    />
                }
            />
        </div>
    );
};

export default InputPesquisar;
