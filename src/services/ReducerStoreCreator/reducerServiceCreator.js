export default function createReducerService(jokiInstance, reducer, options) {
    const serviceId = options.serviceId ? options.serviceId : "ReducerStoreService";
    const joki = jokiInstance;
    let state = {__stateVersion: 0};

    function eventHandler(event) {
        if (event.key === "initialize" && event.from === "JOKI") {
            init();
            return;
        }

        if (event.key === "getServiceState") {
            return parseReturnState();
        }

        if (event.key === "dispatch") {
            const newState = reducer(state, event.body);
            if (newState !== null && newState.__stateVersion === undefined) {
                newState.__stateVersion = state.__stateVersion + 1;
                state = newState;
                triggerServiceUpdate();
            } else {
                if (newState.__stateVersion !== undefined) {
                    throw new Error("Reducer function must return a new state object, not to alter the existing one");
                }
            }
        }
    }

    function init() {
        state = options.initialState ? options.initialState : {};
        state.__stateVersion = 0;
    }

    function parseReturnState() {
        const returnState = {...state};
        delete returnState.__stateVersion;
        return returnState;
    }

    function triggerServiceUpdate() {
        joki.trigger({
            from: serviceId,
            key: "serviceUpdate",
            serviceUpdate: true,
            body:  parseReturnState(),
        });
    }

    joki.addService({
        id: serviceId,
        fn: eventHandler,
    });
}
