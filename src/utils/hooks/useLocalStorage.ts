import { useCallback } from "react";

const useLocalStorage = (key?: string) => {
    const set = useCallback(
        (item: string, _key?: string) => {
            const keyToUse = _key || key;
            if (keyToUse) localStorage.setItem(keyToUse, item);
        },
        [key]
    );

    const get = useCallback(
        (_key?: string) => {
            const keyToUse = _key || key;
            if (keyToUse) return localStorage.getItem(keyToUse);
        },
        [key]
    );

    const remove = useCallback(
        (_key?: string) => {
            const keyToUse = _key || key;
            if (keyToUse) localStorage.removeItem(keyToUse);
        },
        [key]
    );

    return { set, get, remove };
};

export default useLocalStorage;
