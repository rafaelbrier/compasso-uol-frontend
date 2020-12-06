import { getUser } from "api/git/services/users-service";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import Button from "components/button/Button";
import InputText from "components/input-text/InputText";
import React, { forwardRef, useCallback, useState } from "react";
import {
    CallbackReturnType,
    CbROptions,
    StateResponse,
} from "utils/hooks/useRequestState";
import ErrorResponse from "utils/types/ErrorResponse";
import UserResponse from "utils/types/UserResponse";
import useInputPesquisar from "./hooks/useInputPesquisar";
import useMaisPesquisados from "./hooks/useMaisPesquisados";
import MaisPesquisados from "./mais-pesquisados/MaisPesquisados";

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

const InputPesquisar = forwardRef<any, InputPesquisarProps>(
    ({ run, isLoading }, ref) => {
        const [inputFocused, setInputFocused] = useState<boolean>(false);
        const {
            options,
            set: setMaisPesquisados,
            remove,
        } = useMaisPesquisados();

        const handlePesquisarClick = useCallback(
            async (_nome?: string) => {
                const response = await run(() => getUser(_nome));
                if (response.success) setMaisPesquisados(_nome);
            },
            [run, setMaisPesquisados]
        );

        const { nome, setNome } = useInputPesquisar(handlePesquisarClick);
        const handleMaisPesquisadoClick = useCallback(
            (_nome?: string) => {
                setInputFocused(false);
                handlePesquisarClick(_nome);
                setNome(_nome);
            },
            [setInputFocused, handlePesquisarClick, setNome]
        );

        return (
            <div className="mt-3">
                <InputText
                    id="input-pesquisar"
                    ref={ref}
                    name="nome"
                    label="Nome do usuário"
                    placeholder="Ex.: rafaelbrier"
                    value={nome}
                    onChange={({ target: { value } }) => setNome(value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => blurField(setInputFocused)}
                    endButton={
                        <Button
                            id="btn-pesquisar"
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
                            inputFocused={inputFocused}
                            options={filterOptions(options, nome)}
                            searchCallback={handleMaisPesquisadoClick}
                            removeCallback={remove}
                        />
                    }
                />
            </div>
        );
    }
);

export default InputPesquisar;
