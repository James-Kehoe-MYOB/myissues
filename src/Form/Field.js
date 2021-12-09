import React from "react";


const Field = ({ field, fieldChanged, type, value, required }) => {

    return (
        <div key={field._uid}>
            <label htmlFor={field._uid}>{field.label}</label>
            <input
                type={type || field.component}
                id={field._uid}
                name={field._uid}
                value={value}
                onChange={e => fieldChanged(field._uid, e.target.value)}
                required={required}
            />
        </div>
    );
};

export default Field;