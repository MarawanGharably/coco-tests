import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBar from '../../components/nav-bar/NavBar';
import NavBarItem from '../../components/nav-bar/NavBarItem';
import Page from '../../layouts/page-template/Page';
import BrandElementsPage from './brand-elements-page/BrandElementsPage';
import ProductPlacementPage from './product-placement-page/ProductPlacementPage';

const PlaceHolderPage = ({ name }) => (
    <Page pageTitle="Placeholder" pageSubTitle="Placeholder">
        <h3>{`O Hai Mark: ${name}`}</h3>
    </Page>
);

const CreatePage = () => {
    const pathPrefix = '/create/';
    const designPath = `${pathPrefix}design`;
    const elementsPath = `${pathPrefix}brand-elements`;
    const productsPath = `${pathPrefix}product-data`;
    const placementPath = `${pathPrefix}product-placement`;
    const interactionPath = `${pathPrefix}content-interaction`;
    const submitPath = `${pathPrefix}submit`;

    return (
        <div id="create-store-page" className="flex full-width">
            <NavBar>
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
            </NavBar>
            <Switch>
                <Route exact path={designPath}>
                    <Redirect to={`${designPath}/products`} />
                </Route>
                <Route
                    path={`${designPath}/products`}
                    render={() => <PlaceHolderPage name="1" />}
                />
                <Route
                    path={`${designPath}/layout`}
                    render={() => <PlaceHolderPage name="2" />}
                />
                <Route
                    path={`${designPath}/style`}
                    render={() => <PlaceHolderPage name="3" />}
                />
                <Route
                    path={`${designPath}/materials`}
                    render={() => <PlaceHolderPage name="4" />}
                />
                <Route

                    path={elementsPath}
                    render={() => <BrandElementsPage />}
                />
                <Route

                    path={productsPath}
                    render={() => <PlaceHolderPage name="6" />}
                />
                <Route

                    path={placementPath}
                    render={() => <ProductPlacementPage />}
                />
                <Route

                    path={interactionPath}
                    render={() => <PlaceHolderPage name="8" />}
                />
                <Route
                    path={submitPath}
                    render={() => <PlaceHolderPage name="9" />}
                />
            </Switch>
        </div>
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