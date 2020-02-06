import React, { useState } from "react";
import PropTypes from "prop-types";

const DROPDOWN_ICON_URL = "https://cdn.obsessvr.com/dropdown-bar-icon.svg";

const UserIcon = ({ imgUrl }) => {
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const toggleDropdown = () => {
        setDisplayDropdown(!displayDropdown);
    };

    // TODO: Will probably need a way for companies to set user profile icons in CMS and retrieve said data.
    return (
        <button id="user-icon-button" className="flex flex-center" type="button" onClick={toggleDropdown}>
            <div id="user-icon-image-container">
                <img id="user-icon-image" className="full-width" alt="user icon" src={imgUrl} />
            </div>
            <div id="user-icon-dropdown-container">
                <img id="user-icon-dropdown-icon" className="full-width" alt="dropdown icon" src={DROPDOWN_ICON_URL} />
            </div>
        </button>
    );
};

UserIcon.propTypes = {
    imgUrl: PropTypes.string
};

UserIcon.defaultProps = {
    imgUrl: "https://placedog.net/150/150"
};

export default UserIcon;
