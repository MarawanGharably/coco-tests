import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import styles from './ConfirmationDialog.module.scss';

const ConfirmationDialog = ({
    title, content, show, confirmLabel, closeLabel, onHide, onConfirm,
}) => (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
            <Modal.Title className="text-center">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p className={`${styles['confirmation-dialog-body']} text-center`} >{content}</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>{closeLabel}</Button>
            <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
        </Modal.Footer>
    </Modal>
);

ConfirmationDialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    show: PropTypes.bool.isRequired,
    confirmLabel: PropTypes.string,
    closeLabel: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

ConfirmationDialog.defaultProps = {
    title: '',
    content: '',
    confirmLabel: 'Yes',
    closeLabel: 'Close',
};

export default ConfirmationDialog;
