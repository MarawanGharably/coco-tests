/*
*
* We use role based access control which comprises 3 layers to decide on user permissions
* - Scope: Values can be one of [Obsess (Internal Users), Client (Client level users), Store (Users that can access only certain stores) ]
* - Reference: For Client and Store scopes, we have reference field, which basically refers to a client/store ID to determine the clients/stores the user has access to.
* - Role: Each scope has dedicated roles which are unix like numerical constants in range 100 - 999
*
* user.permissions object looks like
* user.permissions = {
*   obsess: { roleValue },
*   client: { clientId: roleValue, clientId2: roleValue2 },
*   store: { storeId: roleValue, storeId2: roleValue2 }
* }
*
* Having it in this format helps to easily search for a particular permission both on frontend and backend.
*
* */

import {getLabelValuePair} from "./helpers";

export const Scopes = Object.freeze({
  Obsess: 'obsess',
  Client: 'client',
  Store: 'store'

})

/*
* Obsess Roles:
* 900 - 999
* */
export const ObsessRoles = Object.freeze({
  SuperAdmin: 999,
  ObsessAdmin: 980,
  Editor: 950,
  Viewer: 900

});

/*
*
* Client Roles
* 501 - 899
*
* */
export const ClientRoles = Object.freeze({
  OrgAdmin: 899,
  Editor: 700,
  Merchandiser: 600,
  Viewer: 501
});


/*
*  Store roles
*  100 - 500
* */
export const StoreRoles = Object.freeze({
  Editor: 500,
  Merchandiser: 250,
  Viewer: 100
});

export const userCanAccessAdminPanel = (userPermissions) => {
  /*
  *
  * Who can access admin panel?
  * 1. Obsess users with scope ObsessAdmin or more.
  * 2. Client users with scope OrgAdmin or more.
  * 3. No one else.
  *
  * */
  if (!userPermissions) {
    return false;
  }

  if (Scopes.Obsess in userPermissions && userPermissions[Scopes.Obsess] >= ObsessRoles.ObsessAdmin) {
    return true;
  } else if (Scopes.Client in userPermissions) {
    // Check if has OrgAdmin access to any client
    // Generally there will be only one client here but this weird check is just to keep it little extensible.
    const roles = Object.values(userPermissions[Scopes.Client]);
    if (roles.find(role => role >= ClientRoles.OrgAdmin)) {
      return true;
    }
  }
  return false;
};

export const getUserMaxScope = (userPermissions) => {
  if (!userPermissions) {
    return null;
  }
  if (Scopes.Obsess in userPermissions) {
    return Scopes.Obsess;
  } else if (Scopes.Client in userPermissions) {
    return Scopes.Client;
  } else if (Scopes.Store in userPermissions) {
    return Scopes.Store;
  }
  throw Error("Illegal permissions object")
}


export const scopesUserCanAdd = (userScope) => {
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

export const isObsessUser=(user)=>(user?.client=='5b3a605cb197ec77a274b150');