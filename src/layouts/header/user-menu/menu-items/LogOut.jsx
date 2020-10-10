import React from 'react';
import { useHistory } from 'react-router-dom';

import { AuthAction, useAuth } from '../../../../auth/Auth';
import { apiUserAuthLogout } from '../../../../utils/apiUtils';


const LogOutButton = (props) => {
    const [, authDispatch] = useAuth();
    const history = useHistory();

    // eslint-disable-next-line react/prop-types
    const { setDisplayDropdown } = props;
    const postLogout = () => {
        setDisplayDropdown(false);
        authDispatch({ type: AuthAction.LOGGED_OUT });
        history.push('/');
    };

    const logout = () => {
        apiUserAuthLogout()
            .then(() => postLogout())
            .catch(() => postLogout());
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
