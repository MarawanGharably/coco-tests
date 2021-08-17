import React from 'react';
import PropTypes from 'prop-types';
import StoreLayout from '../../../components/layouts/StoreLayout';


const StoreGeneralPage = () => {
    return (<StoreLayout fluid={'xl'} title='General'>


            </StoreLayout>);
};


StoreGeneralPage.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string,
        url: PropTypes.string,
    }),
};

StoreGeneralPage.defaultProps = {
    match: {
        path: '',
        url: '',
    },
};

export default StoreGeneralPage;
