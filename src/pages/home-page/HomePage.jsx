import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Page from '../../layouts/page-template/Page';
import FancyButton from '../../components/fancy-button/FancyButton';
import { useHomePageData, HomePageActionEnums } from '../../data-store/home-page-data-store/HomePageDataStore';
import { API_URL } from '../../utils/apiFetch';
import Loader from '../../components/loader/Loader';

const BUILD_STAGE_ENUMS = Object.freeze({
    START: 'Start',
    IN_PROGRESS: 'In progress',
    IN_REVIEW: 'In review',
    COMPLETE: 'Complete',
});

const {
    START, IN_PROGRESS, IN_REVIEW, COMPLETE,
} = BUILD_STAGE_ENUMS;

// Map of button copy according to what stage of the store creation process a client is in
const CURRENT_BUILD_STAGE_COPY = {
    [START]: 'START CREATING',
    [IN_PROGRESS]: 'RESUME CREATING',
    [IN_REVIEW]: 'IN REVIEW',
    [COMPLETE]: 'COMPELTE',
};

const HomePage = () => {
    const [state, dispatch] = useHomePageData();
    const history = useHistory();
    const {
        storeId, buildStage, thumbnailUrl, statusCode,
    } = state;

    useEffect(() => {
        // fetching function that dispatches actions
        const fetchHomepageData = async () => {
            try {
                const response = await fetch(`${API_URL}/client/stores`);
                if (response.status === 200) {
                    const body = await response.json();
                    // DATA IS JUST THE FIRST STORE RECEIVED FOR NOW
                    const data = body[0];

                    dispatch({
                        type: HomePageActionEnums.RECEIVE_HOMEPAGE_DATA,
                        payload: {
                            storeId: data._id, //eslint-disable-line
                            buildStage: data.build_stage,
                            thumbnailUrl: data.thumbnail,
                            statusCode: response.status,
                        },
                    });
                } else {
                    const errorBody = await response.json();
                    const error = {
                        status: response.status,
                        body: errorBody,
                    };

                    throw error;
                }
            } catch (error) {
                console.error(`ERROR ${error.status}:`, error.body.title); //eslint-disable-line
                history.push('/404');
            }
        };

        fetchHomepageData();
    }, [dispatch, history]);

    if (!statusCode) {
        return <Loader />;
    }

    return (
        <Page pageTitle="Store Status" pageSubTitle={buildStage === START ? 'No stores created yet!' : ''}>
            <div className="home-page-image-container" data-id={storeId}>
                <img alt="store preview" src={thumbnailUrl} />
            </div>
            <div className="home-page-button-container">
                <FancyButton text={CURRENT_BUILD_STAGE_COPY[buildStage]} />
            </div>
            <div className="stick-to-bottom flex flex-column">
                <Link to="/register">Register Here</Link>
                <Link to="/create/design">Create a store</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/example">See Example</Link>
            </div>
        </Page>
    );
};

export default HomePage;
