import React, { useEffect, useState } from "react";
import styles from "./PermissionsEditor.module.scss";
import { Button } from "react-bootstrap";
import { Field } from "redux-form";
import { getUserMaxScope, Scopes } from "../../../../utils/permissions";
import { getLabelValuePair } from "../../../../utils/helpers";
import PermissionsEditorRow from "./PermissionsEditorRow";


const PermissionsEditor = ({fields, userPermissions, clients = [], stores = [] }) => {

  const scopesUserCanAdd = (userScope) => {
    switch (userScope) {
      case Scopes.Obsess:
        return [
          getLabelValuePair(Scopes.Obsess),
          getLabelValuePair(Scopes.Client),
          getLabelValuePair(Scopes.Store)
        ];
      case Scopes.Client:
        return [
          getLabelValuePair(Scopes.Client),
          getLabelValuePair(Scopes.Store)
        ];
      default:
        return [];
    }
  };

  const [scopes, setScopes] = useState();

  useEffect(() => {
    const userMaxScope = getUserMaxScope(userPermissions);
    setScopes(scopesUserCanAdd(userMaxScope));
  }, [userPermissions]);

  const onAddPermission = () => {
    fields.push({});
  };

  return (
    <div className={styles.permissionEditor}>
      <Button onClick={onAddPermission}>
        <i className={`${styles.addIcon} fas fa-plus-circle`} />
        Add New Permission
      </Button>


      {fields.map((item, index, fields) =>
        <Field
          key={index}
          name={item}
          component={PermissionsEditorRow}
          index={index}
          fields={fields}
          userPermissions={userPermissions}
          scopes={scopes} stores={stores}
          clients={clients}
          className={styles.item}
        />)
      }

    </div>
  );
};

export default PermissionsEditor;
