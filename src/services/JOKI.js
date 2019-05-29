
import {createJoki} from 'joki';
import createMapStoreService from './MapStore/mapStoreService';

const JOKI = createJoki();
createMapStoreService(JOKI,  {
    serviceId: "Store"
});

export default JOKI;