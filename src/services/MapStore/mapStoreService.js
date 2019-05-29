export default function createMapStoreService(jokiInstance, options={}) {
    const serviceId = options.serviceId ? options.serviceId : "MapStoreService";
    const joki = jokiInstance;
    const data = new Map();

    function eventHandler(event) {
        if(event.key === "initialize" && event.from === "JOKI") {
            init();
            return;
        }
        switch(event.key) {
            case "get":
                if(event.body === undefined) {
                    return new Map(data);
                }
                return data.has(event.body) ? data.get(event.body) : undefined;
            case "set":
                data.set(event.body.key, event.body.value);
                triggerServiceUpdate();
                break;
            case "del":
                if(data.has(event.body)) {
                    data.delete(event.body);
                    triggerServiceUpdate();
                }
                break;
            case "getServiceState":
                    return new Map(data);
            default:
                return;
        }
    }

    function init() {
        data.clear();
    }

    function triggerServiceUpdate() {
        joki.trigger({
            from: serviceId,
            key: "serviceUpdate",
            serviceUpdate: true,
            body: new Map(data)
        });
    }

    joki.addService({
        id: serviceId,
        fn: eventHandler
    });
}