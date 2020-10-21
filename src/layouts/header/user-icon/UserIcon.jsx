import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserMenu from '../user-menu/UserMenu';

const DROPDOWN_ICON_URL = 'https://cdn.obsessvr.com/dropdown-bar-icon.svg';

const UserIcon = ({ imgUrl }) => {
    const [displayDropdown, setDisplayDropdown] = useState(false);


    const toggleDropdown = () => {
        setDisplayDropdown(!displayDropdown);
    };

    return (
        <div>
            <button id="user-icon-button" className="flex flex-vertical-center hoverable" type="button" onClick={toggleDropdown}>
                <div id="user-icon-image-container">
                    <img id="user-icon-image" className="full-width" alt="user icon" src={imgUrl} />
                </div>
                <div id="user-icon-dropdown-container">
                    <img id="user-icon-dropdown-icon" className="full-width" alt="dropdown icon" src={DROPDOWN_ICON_URL} />
                </div>
            </button>
            {displayDropdown && <UserMenu setDisplayDropdown={setDisplayDropdown} />}
        </div>
    );
};

UserIcon.propTypes = {
    imgUrl: PropTypes.string,
};

UserIcon.defaultProps = {
    imgUrl: 'https://cdn.obsessvr.com/coco/Default-Profile-Icon.png',
};

export default UserIcon;
