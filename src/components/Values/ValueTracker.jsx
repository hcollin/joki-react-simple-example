import React from "react";

import useValue from './useValue';

import './values.css';
export default function ValueTracker(props) {
    const [value] = useValue(props.valueKey, props.initialValue);

    return (
        <div className="values value-tracker">
            <label>{props.valueKey}</label>
            <p>{value}</p>
        </div>
    );
}
