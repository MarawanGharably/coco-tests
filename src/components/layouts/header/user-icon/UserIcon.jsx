import React, { useState } from "react";

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
                <img alt="user icon" />
            </div>
            <div id="user-icon-dropdown-container">
                <img id="user-icon-dropdown-icon" className="full-width" alt="dropdown icon" src={DROPDOWN_ICON_URL} />
            </div>
        </button>
    );
};

export default UserIcon;
