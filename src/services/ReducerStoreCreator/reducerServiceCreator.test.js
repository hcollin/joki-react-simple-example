import { createJoki } from "joki";
import createReducerService from "./reducerServiceCreator";

describe("ReducerStore", () => {
    function testReducer(state, action) {
        // console.log("Reducer", state, action);
        switch (action.type) {
            case "plus":
                return { counter: state.counter + 1 };
            default:
                return null;
        }
    }

    it("Reducer Store registers correctly", () => {
        const joki = createJoki();
        createReducerService(joki, testReducer, {
            serviceId: "Store",
            initialState: { counter: 0 },
        });

        expect(joki.listServices()[0]).toBe("Store");
    });

    it("Test ReducerStore dispatch action", () => {
        const joki = createJoki();
        createReducerService(joki, testReducer, {
            serviceId: "Store",
            initialState: { counter: 0 },
        });
        // initialState is set only after initialization broadcast is sent by Joki
        joki.initServices();

        joki.on({
            from: "Store",
            key: "serviceUpdate",
            fn: event => {
                expect(event.body).toEqual({ counter: 1 });
            },
        });

        joki.trigger({
            to: "Store",
            key: "dispatch",
            body: {
                type: "plus",
            },
        });

        expect.assertions(1);
    });
});
