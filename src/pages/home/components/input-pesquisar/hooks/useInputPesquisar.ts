import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes<S> {
    nomePesquisa: S;
}
const useInputPesquisar = <S extends string | undefined>(
    searchCallback: (nome: S) => void
): { nome: S; setNome: Dispatch<SetStateAction<S>> } => {
    const params = useParams<ParamTypes<S>>();
    const nomeParams = useMemo(() => params?.nomePesquisa, [params]);
    const [nome, setNome] = useState<S>(nomeParams);

    useEffect(() => {
        nomeParams && searchCallback(nomeParams);
    }, [searchCallback, nomeParams]);

    return { nome, setNome };
};

export default useInputPesquisar;
