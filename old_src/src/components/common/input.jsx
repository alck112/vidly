import React from 'react';

const Input = ({name, label, error, ...rest}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>

            {/*<input*/}
            {/*    value={value}*/}
            {/*    onChange={onChange}*/}
            {/*    type={type}*/}
            {/*    name={name}*/}
            {/*    id={name}*/}
            {/*    className="form-control"*/}
            {/*/>*/}

            {/*Using rest to contain repetitive pattern like value={value} onChange={onChange}*/}

            <input
                {...rest}
                name={name}
                id={name}
                className="form-control"
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;