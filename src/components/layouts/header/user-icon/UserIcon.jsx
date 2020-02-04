import React, { useState } from "react";

const DEFAULT_USER_ICON_URL = "https://via.placeholder.com/150";
const DROPDOWN_ICON_URL = "https://cdn.obsessvr.com/dropdown-bar-icon.svg";

const UserIcon = () => {
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const toggleDropdown = () => {
        setDisplayDropdown(!displayDropdown);
    };

    // TODO: Will probably need a way for companies to set user profile icons in CMS and retrieve said data.
    return (
        <button id="user-icon-button" className="flex flex-center" type="button" onClick={toggleDropdown}>
            <div id="user-icon-image-container">
                <img id="user-icon-image" className="full-width" alt="user icon" src={DEFAULT_USER_ICON_URL} />
            </div>
            <div id="user-icon-dropdown-container">
                <img id="user-icon-dropdown-icon" className="full-width" alt="dropdown icon" src={DROPDOWN_ICON_URL} />
            </div>
        </button>
    );
};

export default UserIcon;
