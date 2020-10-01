import React from 'react';
import LogOutButton from './menu-items/LogOut';

const UserMenu = (props) => {
    console.log(props);
    return (
        <div id="user-dropdown-container" className="user-drop-down-container" on>
            <LogOutButton setDisplayDropdown={props.setDisplayDropdown} />
        </div>
    );
};

export default UserMenu;
