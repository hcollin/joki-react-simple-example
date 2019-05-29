import { useState, useEffect, useCallback } from "react";
import useService from "../../services/useService";

export default function useValue(valueKey, initialValue) {
    const [store, Service] = useService("Store");
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if(store !== null && !store.has(valueKey) && initialValue !== undefined) {
            Service.trigger("set", {
                key: valueKey,
                value: initialValue,
            });
        }
        if(store !== null && store.has(valueKey) && store.get(valueKey) !== value) {
            setValue(store.get(valueKey));
        }

    }, [store, initialValue, valueKey, Service, value]);

    const setNewValue = useCallback((newValue) => {
        Service.trigger("set", {
            key: valueKey,
            value: newValue,
        });
    }, [valueKey, Service]);

    return [value, setNewValue];
}
