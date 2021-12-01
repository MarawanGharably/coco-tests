import React, { useMemo } from 'react';
import styles from './PermissionsEditor.module.scss';
import { Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
import { getUserMaxScope, scopesUserCanAdd } from '../../../../utils/permissions';
import PermissionsEditorRow from './PermissionsEditorRow';

const PermissionsEditor = ({ fields, clients = [], stores = [] }) => {
    const sessionUser = useSelector((state) => state.user);

    const scopes = useMemo(() => {
        if (!sessionUser?.permissions) return [];
        const userMaxScope = getUserMaxScope(sessionUser.permissions);
        return scopesUserCanAdd(userMaxScope);
    }, [sessionUser?.permissions]);

    const onAddPermission = () => {
        fields.push({});
    };


    return (
        <div className={styles.permissionEditor}>
            <Button onClick={onAddPermission}>
                <i className={`${styles.addIcon} fas fa-plus-circle`} />
                Add New Permission
            </Button>

            {fields.map((item, index, fields) => (
                <Field
                    key={index}
                    name={item}
                    component={PermissionsEditorRow}
                    index={index}
                    fields={fields}
                    userPermissions={sessionUser?.permissions}
                    scopes={scopes}
                    stores={stores}
                    clients={clients}
                    className={styles.item}
                />
            ))}
        </div>
    );
};

export default PermissionsEditor;
