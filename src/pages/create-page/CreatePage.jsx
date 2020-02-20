import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../../components/nav-bar/NavBar';
import NavBarItem from '../../components/nav-bar/NavBarItem';

const PlaceHolderPage = () => (
    <div className="flex flex-center full-width full-height">
        <h3>O Hai Mark</h3>
    </div>
);

const CreatePage = ({ match }) => {
    const pathPrefix = match.path && `${match.path}/`;
    const designPath = `${pathPrefix}design`;
    const elementsPath = `${pathPrefix}elements`;
    const productsPath = `${pathPrefix}products`;
    const placementPath = `${pathPrefix}placement`;
    const interactionPath = `${pathPrefix}interaction`;
    const submitPath = `${pathPrefix}submit`;

    return (
        <div className="create-store-page flex full-width">
            <NavBar>
                <NavBarItem
                    name="DESIGN"
                    pathName={designPath}
                >
                    <NavBarItem
                        name="Number of products"
                        pathName={`${designPath}/number`}
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
            <Route exact path={designPath}>
                <Redirect to={`${designPath}/number`} />
            </Route>
            <Route
                exact
                path={`${designPath}/number`}
                component={PlaceHolderPage}
            />
            <Route
                exact
                path={`${designPath}/layout`}
                component={PlaceHolderPage}
            />
            <Route
                exact
                path={`${designPath}/style`}
                component={PlaceHolderPage}
            />
            <Route
                exact
                path={`${designPath}/materials`}
                component={PlaceHolderPage}
            />
            <Route
                exact
                path={elementsPath}
                component={PlaceHolderPage}
            />
            <Route
                exact
                path={productsPath}
                component={PlaceHolderPage}
            />
            <Route
                exact
                path={placementPath}
                component={PlaceHolderPage}
            />
            <Route
                exact
                path={interactionPath}
                component={PlaceHolderPage}
            />
            <Route
                exact
                path={submitPath}
                component={PlaceHolderPage}
            />
        </div>
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
