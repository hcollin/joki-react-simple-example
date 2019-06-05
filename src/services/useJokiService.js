import { useState } from "react";
import { useService } from "joki-react";
import JOKI from './JOKI';

export default function useJokiService(serviceId) {

    const [value] = useService(serviceId, JOKI);

    return value;

}
