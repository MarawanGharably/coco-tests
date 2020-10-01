import React from 'react';
import { AuthAction, useAuth } from '../../../../auth/Auth';
import { apiUserAuthLogout } from '../../../../utils/apiUtils';


const LogOutButton = (props) => {
    const [, authDispatch] = useAuth();
    // eslint-disable-next-line react/prop-types
    const { setDisplayDropdown } = props;
    const logout = () => {
        apiUserAuthLogout()
            .then(() => {
                setDisplayDropdown(false);
                authDispatch({ type: AuthAction.LOGGED_OUT });
            });
    };

    return (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className="user-menu-row" onClick={() => logout()}>
            <span>Log Out</span>
        </div>
    );
};

export default LogOutButton;
