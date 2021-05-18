import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    fadeInDown,
    fadeOutDown,
} from './styles';

const Toast = ({ children, close, delay, backgroundColor }) => {
    const [animation, setAnimation] = useState(fadeInDown);

    useEffect(() => {
        const closeToast = () => {
            setAnimation(fadeOutDown);

            setTimeout(close, 1000);
        };

        const timeout = setTimeout(() => {
            closeToast();
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Container
            animation={animation}
            backgroundColor={backgroundColor}
        >
            {children}
        </Container>
    );
};

Toast.propTypes = {
    children: PropTypes.element.isRequired,
    close: PropTypes.func,
    delay: PropTypes.number,
    backgroundColor: PropTypes.string,
};

Toast.defaultProps = {
    close: () => {},
    delay: 5000,
    backgroundColor: '#5cb85c',
};

const withActive = (Component) => (props) => (
    props.active && <Component {...props} /> //eslint-disable-line
);

const ToastWithActive = withActive(Toast);

export default ToastWithActive;
