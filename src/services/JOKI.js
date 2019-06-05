
import {createJoki, createMapService } from 'joki';
import createMapStoreService from './MapStore/mapStoreService';

const JOKI = createJoki({
    debug: false
});
createMapStoreService(JOKI,  {
    serviceId: "Store"
});

createMapService(JOKI, {
    serviceId: "TestService",
    initial: {
        setWhenCreated: true,
        data: new Map([["foo", "bar"], ["alpha", "omega"]])
    }
});


export default JOKI;
