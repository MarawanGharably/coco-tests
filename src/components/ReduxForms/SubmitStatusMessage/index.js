import { Alert } from 'react-bootstrap';
import React from 'react';

export default function SubmitStatusMessage({ status }) {
    if (status?.error || status?.success) {
        return <Alert variant={status.error ? 'danger' : 'success'}>{status.message}</Alert>;
    } else {
        return false;
    }
}
