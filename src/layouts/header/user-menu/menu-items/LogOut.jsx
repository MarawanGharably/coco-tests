import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { logOut } from '../../../../store/actions';

const LogOutButton = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    // eslint-disable-next-line react/prop-types
    const { setDisplayDropdown } = props;

    const logout = () => {
        dispatch(logOut())
            .then(() => {
                history.push('/');
            })
            .catch(() => {
                setDisplayDropdown(false);
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
