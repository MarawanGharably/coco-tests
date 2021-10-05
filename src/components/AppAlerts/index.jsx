import React from 'react';
import { Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideAppAlert } from '../../store/actions/appAlertsActions';
import styles from './appAlerts.module.scss';

/**
 * AppAlerts - Global App Alerting component. Work in progress...
 * @show - true/false
 * @type - error/warning/success/etc
 * @returns {JSX.Element}
 */
export default function AppAlerts(){
    const alertsState = useSelector(state => state.appAlerts);
    const { show=false, type='info', message='' } = alertsState || {};
    const dispatch = useDispatch();
    const _DELAY = 10000;//10 sec


    return (
        <div className={styles['_']}>
            <Toast
                className={type}
                onClose={()=> dispatch(hideAppAlert())}
                show={show}
                delay={_DELAY}
                autohide
            >
                <Toast.Header className={'justify-content-between'}>
                    Error:
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    );
};