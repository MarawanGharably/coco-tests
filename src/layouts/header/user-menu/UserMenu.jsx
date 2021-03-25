import React from 'react';
import LogOutButton from './menu-items/LogOut';

const UserMenu = (props) => {
    // eslint-disable-next-line react/prop-types
    const { setDisplayDropdown } = props;
    return (
        <div id="user-dropdown-container" className="user-drop-down-container" on="true">
            <LogOutButton setDisplayDropdown={setDisplayDropdown} />
        </div>
    );
};

export default UserMenu;
