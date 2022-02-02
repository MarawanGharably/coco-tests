import React from "react";
import { Field } from "redux-form";
import { Button } from "react-bootstrap";
import { ClientRoles, ObsessRoles, Scopes, StoreRoles } from "../../../../utils/permissions";
import styles from "./PermissionsEditor.module.scss";
import { getLabelValuePair } from "../../../../utils/helpers";
import { Select } from "../index";

const PermissionsEditorRow = ({input, index, fields, userPermissions, scopes, stores, clients, className }) => {

  const onDeletePermission = (index) => {
    fields.remove(index);
  };

  const getRolesUserCanAddForScopeObsess = (scope) => {
    if (userPermissions[scope] >= ObsessRoles.ObsessAdmin) {
      const userRole = userPermissions[scope];
      const canAdd = Object.keys(ObsessRoles).filter(key => ObsessRoles[key] <= userRole);
      return canAdd.map(item => getLabelValuePair(item, ObsessRoles[item]));
    } else {
      throw Error("User cannot add other users for this scope");
    }
  };

  const getMaxUserRoleToAddExternalUser = (reference) => {
    // Determine max role for user for this scope
    let userRole = 99; // There will never be a lower role
    if (Scopes.Obsess in userPermissions && userPermissions[Scopes.Obsess] >= ObsessRoles.ObsessAdmin) {
      // Obsess roles that can add users to clients
      userRole = userPermissions[Scopes.Obsess];
    } else if (userPermissions[Scopes.Client][reference] >= ClientRoles.OrgAdmin) {
      // Client org roles that can add users
      // Checks on per client basis
      userRole = userPermissions[Scopes.Client][reference];
    }
    return userRole;
  };

  const getRolesUserCanAddForScopeClient = (reference) => {
    const userRole = getMaxUserRoleToAddExternalUser(reference);
    // Filter roles user can add. Any user can add other users with role less than or equal to theirs.
    const canAdd = Object.keys(ClientRoles).filter(key => ClientRoles[key] <= userRole);
    if (canAdd.length > 0) {
      return canAdd.map(item => getLabelValuePair(item, ClientRoles[item]));
    } else {
      throw Error("User cannot add any users");
    }
  };

  const getRolesUserCanAddForScopeStore = (reference) => {
    const matchingStore = stores.find(item => item.value === reference);
    if (matchingStore) {
      const clientId = matchingStore['client']
      const userRole = getMaxUserRoleToAddExternalUser(clientId);
      if (userRole >= 899) {
        return Object.keys(StoreRoles).map(item => getLabelValuePair(item, StoreRoles[item]));
      } else {
        throw Error("User cannot add any users");
      }
    }
  };


  const getRolesUserCanAddForScope = (scope, reference = undefined) => {
    if (scope === Scopes.Obsess) {
      // Obsess roles that can add other obsess roles
      return getRolesUserCanAddForScopeObsess(scope);
    } else if (scope === Scopes.Client) {
      return getRolesUserCanAddForScopeClient(reference);
    } else if (scope === Scopes.Store) {
      return getRolesUserCanAddForScopeStore(reference);
    }
  };

  const getReferences = (scope) => {
    if (scope === Scopes.Client) {
      return clients;
    }else if (scope === Scopes.Store) {
      return stores
    }
  }

  const displayRole = (scope, reference ) => {
    return !!(scope === Scopes.Obsess || (scope && reference));
  };

  return (
    <div className={className}>
      <Field
        name={`${input.name}.scope`}
        className={styles.field}
        placeholder={"Scope"}
        options={scopes}
        component={Select}
        variant='light'
        onChange={(val) => input.onChange({scope: val})}
      />

      {input?.value.scope && input?.value.scope !== Scopes.Obsess &&
        <Field
          name={`${input.name}.reference`}
          className={styles.field}
          placeholder={`Select ${input?.value.scope}`}
          searchable
          options={getReferences(input?.value?.scope)}
          component={Select}
          variant='light'
        />
      }

      {displayRole(input?.value?.scope, input?.value?.reference) &&
        <Field
          name={`${input.name}.role`}
          className={styles.field}
          placeholder={"Select Role"}
          options={getRolesUserCanAddForScope(input?.value.scope, input?.value.reference)}
          component={Select}
          variant='light'
        />
      }

      <Button variant="outline-danger" onClick={() => onDeletePermission(index)} size="xs">
        <i className="fas fa-trash-alt" />
      </Button>
    </div>
  );
}

export default PermissionsEditorRow;
