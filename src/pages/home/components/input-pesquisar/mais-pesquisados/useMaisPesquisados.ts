import { useCallback, useMemo, useState } from "react";
import useLocalStorage from "utils/hooks/useLocalStorage";

const SEP = ",";
const MAIS_PESQUISADOS_KEY = "mp";

function loadFromLocalStorage(lsVal?: string | null): string[] {
    return lsVal ? lsVal.split(SEP) : [];
}

function onlyUnique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
}

const useMaisPesquisados = (optionsLim: number = 5) => {
    const { set: setLocalStorage, get: getLocalStorage } = useLocalStorage(
        MAIS_PESQUISADOS_KEY
    );
    const _defaultOptions = useMemo(
        () => loadFromLocalStorage(getLocalStorage()),
        [getLocalStorage]
    );
    const [options, setOptions] = useState<string[]>(_defaultOptions);

    const set = useCallback(
        (item?: string) => {
            if (item) {
                if (!options.includes(item)) {
                    const _opcoes = [item, ...options]
                        .slice(0, optionsLim - 1)
                        .filter(onlyUnique);
                    setLocalStorage(_opcoes.join(SEP));
                    setOptions(_opcoes);
                }
            }
        },
        [options, optionsLim, setLocalStorage, setOptions]
    );

    return { set, options };
};

export default useMaisPesquisados;
