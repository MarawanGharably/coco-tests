import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/layouts/Footer';
import ProductPlacementPage from '../../components/CreatePageComponents/product-placement-page/ProductPlacementPage';
import FooterNavContextComponent from '../../components/CreatePageComponents/FooterNavContextComponent';
import usePublishStore from '../../components/CreatePageComponents/PublishStore';
import LoadingScreen from '../../components/loading-screen/LoadingScreen';
import Layout from '../../components/layouts/Layout';
import ToastMessages from "../../components/toast-messages/ToastMessages";

const CreatePage = () => {
    const { isLoading, publishSceneData } = usePublishStore();

    return (
        <>
            <Layout fluid={'xl'}>
                <ToastMessages />
                <div id="create-store-page">
                    <ProductPlacementPage />
                </div>
                {isLoading && <LoadingScreen />}
            </Layout>

            <FooterNavContextComponent>
                <Footer onSubmitClicked={publishSceneData} buttonText="PUBLISH" />
            </FooterNavContextComponent>
        </>
    );
};

CreatePage.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string,
        url: PropTypes.string,
    }),
};

CreatePage.defaultProps = {
    match: {
        path: '',
        url: '',
    },
};

export default CreatePage;
