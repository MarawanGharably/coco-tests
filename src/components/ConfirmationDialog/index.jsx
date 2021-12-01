import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import styles from './ConfirmationDialog.module.scss';

const ConfirmationDialog = ({title, show, confirmLabel='Yes', closeLabel='Close', onHide, onConfirm, showCloseIcon=true, showFooter=true, children}) => {
    return(
        <Modal show={show} className={styles.cmp} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton={showCloseIcon}>
                <Modal.Title className="text-center">{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{textAlign: "center"}}>
                {children}
            </Modal.Body>

            {showFooter && (<Modal.Footer>
                <Button variant="secondary" onClick={onHide}>{closeLabel}</Button>
                <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
            </Modal.Footer>)}
        </Modal>
    );
}

ConfirmationDialog.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    confirmLabel: PropTypes.string,
    closeLabel: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

ConfirmationDialog.defaultProps = {
    title: '',
    confirmLabel: 'Yes',
    closeLabel: 'Close',
};

export default ConfirmationDialog;
