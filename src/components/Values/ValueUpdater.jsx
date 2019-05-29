import React from 'react';

import useValue from './useValue';

import './values.css';

export default function ValueUpdater(props) {

    const [value, update] = useValue(props.valueKey);

    const valueType = typeof value;

    function updateValue() {
        if(valueType === "number") {
            update(value + 1);
        }

        if(valueType === "string") {
            update(`${value}a`);
        }
    }

    return (
        <div className="values value-updater">
            <label>{props.valueKey}</label>

            <button onClick={updateValue}>Update!</button>

        </div>
    )
}