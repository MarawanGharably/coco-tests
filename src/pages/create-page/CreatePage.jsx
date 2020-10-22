import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper';
import Footer from '../../layouts/footer/Footer';
import Page from '../../layouts/page-template/Page';
// import BrandElementsPage from './brand-elements-page/BrandElementsPage';
import ProductPlacementPage from './product-placement-page/ProductPlacementPage';
// import ProductDataPage from './product-data-page/ProductDataPage';
// import DesignProductsPage from './store-design-page/DesignProductsPage';
// import DesignLayoutPage from './store-design-page/DesignLayoutPage';
// import DesignStylePage from './store-design-page/DesignStylePage';
// import DesignMaterialsPage from './store-design-page/DesignMaterialsPage';
// import ContentInteractionPage from './content-interaction-page/ContentInteractionPage';
// import SubmitPage from '../submit-page/SubmitPage';
import FooterNavContextComponent from './FooterNavContextComponent';

const PlaceHolderPage = ({ name }) => (
    <Page pageTitle="Placeholder" pageSubTitle="Placeholder">
        <h3>{`O Hai Mark: ${name}`}</h3>
    </Page>
);

const CreatePage = () => {
    const pathPrefix = '/create/';
    // const designPath = `${pathPrefix}design`;
    // const elementsPath = `${pathPrefix}brand-elements`;
    // const productsPath = `${pathPrefix}product-data`;
    const placementPath = `${pathPrefix}product-placement`;
    // const interactionPath = `${pathPrefix}content-interactions`;
    // const submitPath = `${pathPrefix}submit`;

    return (
        <>
            <BodyWrapper>
                <div id="create-store-page" className="flex full-width">
                    {/* <NavBar>
                        <NavBarItem
                            name="DESIGN"
                            pathName={designPath}
                        >
                            <NavBarItem
                                name="Number of products"
                                pathName={`${designPath}/products`}
                                child
                            />
                            <NavBarItem
                                name="Layout"
                                pathName={`${designPath}/layout`}
                                child
                            />
                            <NavBarItem
                                name="Style"
                                pathName={`${designPath}/style`}
                                child
                            />
                            <NavBarItem
                                name="Materials"
                                pathName={`${designPath}/materials`}
                                child
                            />
                        </NavBarItem>
                        <NavBarItem
                            name="BRAND ELEMENTS"
                            pathName={elementsPath}
                        />
                        <NavBarItem
                            name="PRODUCT DATA"
                            pathName={productsPath}
                        />
                        <NavBarItem
                            name="PRODUCT PLACEMENT"
                            pathName={placementPath}
                        />
                        <NavBarItem
                            name="CONTENT INTERACTIONS"
                            pathName={interactionPath}
                        />
                        <NavBarItem
                            name="REVIEW & SUBMIT"
                            pathName={submitPath}
                        />
                    </NavBar> */}
                    <Switch>
                        <Route exact path="/create">
                            <Redirect to={`${placementPath}`} />
                        </Route>
                        {/* <Route exact path={designPath}>
                            <Redirect to={`${designPath}/products`} />
                        </Route>
                        <Route
                            path={`${designPath}/products`}
                            render={() => <DesignProductsPage />}
                        />
                        <Route
                            path={`${designPath}/layout`}
                            render={() => <DesignLayoutPage />}
                        />
                        <Route
                            path={`${designPath}/style`}
                            render={() => <DesignStylePage />}
                        />
                        <Route
                            path={`${designPath}/materials`}
                            render={() => <DesignMaterialsPage />}
                        />
                        <Route
                            path={elementsPath}
                            render={() => <BrandElementsPage />}
                        />
                        <Route
                            path={productsPath}
                            render={() => <ProductDataPage />}
                        /> */}
                        <Route
                            path={placementPath}
                            render={() => <ProductPlacementPage />}
                        />
                        {/* <Route
                            path={interactionPath}
                            render={() => <ContentInteractionPage />}
                        />
                        <Route
                            path={submitPath}
                            render={() => <SubmitPage />}
                        /> */}
                    </Switch>
                </div>
            </BodyWrapper>
            <FooterNavContextComponent>
                <Footer />
            </FooterNavContextComponent>
        </>
    );
};

PlaceHolderPage.propTypes = {
    name: PropTypes.string,
};

PlaceHolderPage.defaultProps = {
    name: '',
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
