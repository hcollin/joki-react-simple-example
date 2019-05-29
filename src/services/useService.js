import {useState, useEffect, useCallback, useReducer} from 'react';

import JOKI from './JOKI';

function reducer(state, action) {
    return action.data;
}

export default function useService(serviceId) {
    // const [serviceState, setServiceState] = useState(null);
    const [serviceState, dispatch] = useReducer(reducer, null);

    
    // Setting initial value for service
    useEffect(() => {
        async function getData() {
            const results = await JOKI.ask({
                to: serviceId,
                key: "getServiceState",
                async: false // Ask without promise
            });
            dispatch({data: results[serviceId]});
        }
        const services = JOKI.listServices();
        if(services.find(s => s === serviceId)) {
            getData(); 
        }
        
    }, [serviceId])

    useEffect( () => {
        return JOKI.on({
            from: serviceId,
            key: "serviceUpdate",
            fn: (event) => {
                dispatch({data: event.body});
            }
        });
    }, [serviceId])

    const askFn = useCallback((eventKey, bodyData) => {
            return JOKI.ask({
                to: serviceId,
                key: eventKey,
                body: bodyData
            });
    }, [serviceId]);

    const triggerFn = useCallback((eventKey, bodyData) => {
        JOKI.trigger({
            to: serviceId,
            key: eventKey,
            body: bodyData
        });
    }, [serviceId]);

    return [serviceState, {ask: askFn, trigger: triggerFn}];
}