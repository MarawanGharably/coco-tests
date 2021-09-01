import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import Footer from '../../layouts/footer/Footer';
import ProductPlacementPage from './product-placement-page/ProductPlacementPage';
import FooterNavContextComponent from './FooterNavContextComponent';
import usePublishStore from './PublishStore';
import LoadingScreen from '../../components/loading-screen/LoadingScreen';
import Layout from '../../layouts/Layout';

const CreatePage = () => {
    const { isLoading, publishSceneData } = usePublishStore();
    const pathPrefix = '/create';
    const placementPath = `${pathPrefix}/product-placement`;

    return (<>
        <Layout fluid={true}>
                <div id="create-store-page" >
                    <Switch>
                        <Route exact path="/create">
                            <Redirect to={`${placementPath}`} />
                        </Route>
                        <Route
                            path={placementPath}
                            render={() => <ProductPlacementPage />}
                        />
                    </Switch>
                </div>
                {isLoading && <LoadingScreen />}
        </Layout>

            <FooterNavContextComponent>
                <Footer onSubmitClicked={publishSceneData} />
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