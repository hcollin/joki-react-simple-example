import React from "react";

import useService from "../services/useService";
import useJokiService from '../services/useJokiService';

import JOKI from "../services/JOKI";

export default function Test(props) {
    const testMap = useJokiService("TestService");

    const valueOfFoo = testMap !== null && testMap instanceof Map ? testMap.get("foo") : "Still null";
    console.log("TestMap", testMap);

    function replaceTestService() {
        JOKI.trigger({
            to: "TestService",
            key: "replace",
            body: new Map([["foo", "replaced"], ["alpha", "omega"]])
        })
    }

    return (
        <div>
            <h1>Test</h1>
            <p>Value of foo is {valueOfFoo}</p>
            <button onClick={replaceTestService}>Replace</button>
        </div>
    );
}
