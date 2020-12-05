import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import sleep from "../functions/sleep";

export interface StateResponse<S, E> {
    isLoading: boolean;
    data: S | null;
    error: E | null;
    success: boolean | undefined;
}

export type CallbackReturnType = <S = any>() => Promise<AxiosResponse<S>>;
export interface RequestStateRun<S, E> {
    run(
        callback: CallbackReturnType,
        options?: CbROptions
    ): Promise<StateResponse<S, E>>;
    clear(timeout?: number): void;
    requestState: StateResponse<S, E>;
}
export interface CbROptions {
    autoClear?: boolean;
    sleep?: boolean;
    sleepTimeout?: number;
}

/**
 * Hook para chamadas assíncronas. Realiza o controle de estado quanto a loading e autoClear automaticamente.
 * @returns {RequestState<S, E>}
 */
const useRequestState = <S, E>(): RequestStateRun<S, E> => {
    /**
     * Estado de retorno
     * @property {S | any} data=null resultado da chamada em caso de sucesso
     * @property {E | any} error='null' dados do erro, em caso de erro. Tenta pegar -> {error.response.data} caso contrário pega o próprop {error}
     * @property {boolean} success='undefined' booleano referente ao sucesso da chamada, true quando retorna {data} e false quando retorna {error}
     * @property {boolean} isLoading=false booleano referente a estado da chamada, true enquando a chamada esta em andamento.
     */
    const requestState: StateResponse<S, E> = {
        data: null,
        error: null,
        success: false,
        isLoading: false,
    };

    const [state, setState] = useState(requestState);

    /**
     * Limpa o estado após o tempo passado no argumento em milissegundos
     * @kind function
     * @param {number} timeout=1000 o tempo em milissegundos
     */
    const clear = useCallback((timeout = 100) => {
        setTimeout(() => {
            setState(requestState);
        }, timeout);
    }, []);

    /**
     * Refere-se ao callback para executar a chamada assíncrona
     * @kind function
     * @param {Function} callback a função que irá ser executada
     * @param {CbROptions|undefined} options opções da chamada
     * @param [options.autoClear=false] {boolean} se true o estado limpará automaticamente após 5 segundos
     * @param [options.sleep=false] {boolean} se true a função irá aguardar o período de tempo definido no parâmetro {sleepTimeout} antes de realizar a chamada
     * @param [options.sleepTimeout=3000] {number} delay antes da chamada da função
     */
    const run = useCallback(
        async (
            callback: CallbackReturnType,
            options?: CbROptions
        ): Promise<StateResponse<S, E>> => {
            setState({
                error: null,
                data: null,
                isLoading: true,
                success: undefined,
            });

            if (options?.sleep) {
                await sleep(options?.sleepTimeout || 3000);
            }

            let responseObj = requestState;
            try {
                const { data: result } = await callback<S | null>();
                responseObj = {
                    ...responseObj,
                    error: null,
                    data: result,
                    success: true,
                };
            } catch (error) {
                if (options?.autoClear) {
                    clear(5000);
                }
                if (error.response && error.response.data) {
                    const errorData = error.response && error.response.data;
                    responseObj = {
                        ...responseObj,
                        error: errorData,
                        data: null,
                        success: false,
                    };
                } else {
                    responseObj = {
                        ...responseObj,
                        error,
                        data: null,
                        success: false,
                    };
                }
            }

            setState(responseObj);
            return responseObj;
        },
        [clear]
    );
    return {
        run,
        requestState: state,
        clear,
    };
};

export default useRequestState;
