import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import styles from './FormActions.module.scss';

const FormActions = ({ submitting, onPageRefresh, onSubmit }) => {
    return (
        <div className={`${styles.cmp} d-flex`}>
            <div className={styles.buttonSet}>
                <Button onClick={onPageRefresh} className={styles.cancelButton}>
                    Cancel
                </Button>
                <Button type="submit" onClick={onSubmit} className={styles.saveButton}>
                    Save
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className={`${styles.spinner} ${submitting ? styles.active : styles.hidden}`}
                    />
                </Button>
            </div>
        </div>
    );
};

export default FormActions;
