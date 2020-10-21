import React from 'react';
import PropTypes from 'prop-types';
import FancyButton from '../../components/fancy-button/FancyButton';
import './_home-page.scss';


const HomePageStoreItem = ({ storeInfo, handleEditStore, thumbnailUrl }) => {
    const { client, name } = storeInfo;
    const storeId = client.$oid;

    const editButtonStyle = {
        width: '17em',
        height: '4em',
        marginTop: '1.5em',
    };

    return (
        <div className="flex flex-column flex-center home-page-card">
            <div className="home-page-image">
                <img alt={name} src={thumbnailUrl} />
                <span className="home-page-image-text">{name}</span>
            </div>
            <FancyButton
                text="EDIT"
                buttonStyle={editButtonStyle}
                onClick={() => handleEditStore(storeId)}
                type="button"
            />
        </div>
    );
};

HomePageStoreItem.propTypes = {
    storeInfo: PropTypes.InstanceOf(PropTypes.Object).isRequired,
    handleEditStore: PropTypes.func.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
};

export default HomePageStoreItem;
