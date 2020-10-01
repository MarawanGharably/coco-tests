import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthAction, useAuth } from '../../../../auth/Auth';
import { apiUserAuthLogout } from '../../../../utils/apiUtils';


const LogOutButton = (props) => {
    const history = useHistory();
    const [, authDispatch] = useAuth();

    useEffect(() => {
        console.log(document.cookie);
    }, []);

    const logout = () => {
        apiUserAuthLogout()
            .then(() => {
                // eslint-disable-next-line react/prop-types
                props.setDisplayDropdown(false);
                authDispatch({ type: AuthAction.LOGGED_OUT });
                // history.pushState(null, null, location.href);
                // window.onpopstate = function(event) {
                //     history.go(1);
                // };

            });
    };

    return (
        <div className="user-menu-row" onClick={() => logout()}>
            <span>Log Out</span>
        </div>
    );
};

export default LogOutButton;
