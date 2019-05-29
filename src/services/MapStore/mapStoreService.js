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
                    return mapToObject(data);
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
                    return mapToObject(data);
            default:
                return;
        }
    }

    function init() {
        data.clear();
    }

    function mapToObject(myMap) {
        return new Map(myMap);
        // const obj = {};
        // myMap.forEach((v, k) => {
        //     obj[k] = v;
        // });
        // return obj;
    }

    function triggerServiceUpdate() {
        joki.trigger({
            from: serviceId,
            key: "serviceUpdate",
            serviceUpdate: true,
            body: mapToObject(data)
        });
    }

    joki.addService({
        id: serviceId,
        fn: eventHandler
    });
}