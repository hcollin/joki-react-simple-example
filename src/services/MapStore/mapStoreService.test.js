import {createJoki} from 'joki';
import createMapStoreService from  './mapStoreService';


describe("Generic Map Store", () => {

    it("Store can be created and it attaches to Joki", () => {
        const joki = createJoki();
        createMapStoreService(joki, {
            serviceId: "MapStore"
        });
        const services = joki.listServices();
        expect(services.length).toBe(1);
        expect(services[0]).toBe("MapStore");
    });

    it("Set, Get and Del from MapStore", async () => {
        const joki = createJoki();
        createMapStoreService(joki, {
            serviceId: "MapStore"
        });

        expect(await joki.ask({
            to: "MapStore",
            key: "get"
        })).toEqual({MapStore: new Map()})

        joki.trigger({
            to: "MapStore",
            key: "set",
            body: {
                key: "foo",
                value: "bar"
            }
        });

        expect(await joki.ask({
            to: "MapStore",
            key: "get",
            body: "foo"
        })).toEqual({MapStore: "bar"});

        joki.trigger({
            to: "MapStore",
            key: "del",
            body: "foo"
        });

        expect(await joki.ask({
            to: "MapStore",
            key: "get",
            body: "foo"
        })).toEqual({MapStore: undefined});

    });

    it("Expect ServiceUpdate event when MapStoreService updates with set or del", async () => {
        const joki = createJoki();
        createMapStoreService(joki, {
            serviceId: "MapStore"
        });

        const updateEvent = jest.fn();

        joki.on({
            from: "MapStore",
            fn: (event) => {
                if(event.serviceUpdate) {
                    expect(event.from).toBe("MapStore");
                    updateEvent();
                }
            }
        });

        joki.trigger({
            to: "MapStore",
            key: "set",
            body: {
                key: "foo",
                value: "bar"
            }
        });

        expect( await joki.ask({
            to: "MapStore",
            key: "get",
            body: "foo"
        })).toEqual({MapStore: "bar"});

        joki.trigger({
            to: "MapStore",
            key: "del",
            body: "foo"
        });

        expect(updateEvent).toBeCalledTimes(2);
        expect.assertions(4);
    });





});