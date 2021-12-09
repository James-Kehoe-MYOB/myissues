import React, { Fragment } from "react";

const Option = ({ field, fieldChanged, value }) => {
    return (
        <div>
            <h3>{field.label}</h3>
            <div className="options">
            {field.options.map((option, index) => {
                return (
                    <Fragment key={option.value}>
                        <label className="radioLabel" htmlFor={option.value}>
                            <input
                                type="radio"
                                id={option.value}
                                name={field._uid}
                                value={option.value}
                                checked={value === option.value}
                                onChange={(e) => {
                                    fieldChanged(field._uid, e.target.value);
                                }}
                            />
                            {option.label}
                        </label>
                        {index < field.options.length - 1 && <br />}
                    </Fragment>
                );

            })}
            </div>
        </div>
    );
};

export default Option;