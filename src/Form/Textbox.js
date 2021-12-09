import React from "react";

const Textbox = ({ field, fieldChanged, value, required }) => {

    return (
        <div key={field._uid}>
            <label htmlFor={field._uid}>{field.label}</label>
            <textarea
                rows="5"
                cols="30"
                id={field._uid}
                name={field._uid}
                value={value}
                onChange={e => fieldChanged(field._uid, e.target.value)}
                required={required}
            />
        </div>
    );
};

export default Textbox;