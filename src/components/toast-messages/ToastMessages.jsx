import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { hideMessage } from '../../store/actions/toastActions';
import './ToastMessages.scss';

const ToastMessages = () => {
    const { message, show, delay, variant } = useSelector(state => state.toastMessages);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideMessage());
    };

    return (
        <Toast
            className={`toast-message bg-${variant}`}
            onClose={handleClose}
            show={show}
            delay={delay}
            autohide
        >
            <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
    );
};

export default ToastMessages;
