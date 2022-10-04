import React from 'react';
import './Button.scss';

const Button = ({children, handler}) => {

    return (
        <button onClick={handler} className='button'>{children}</button>
    );
};

export default Button;
