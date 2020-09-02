import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Page from '../../layouts/page-template/Page';
import { API_URL } from '../../utils/envVariables';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper';
import Footer from '../../layouts/footer/Footer';
import Loader from '../../components/loader/Loader';
import SubmitButton from '../../components/submit-button/SubmitButton';
// eslint-disable-next-line
// import { useHomePageData, HomePageActionEnums } from '../../data-store/home-page-data-store/HomePageDataStore';

const GET_ALL_STORES_URL = `${API_URL}/client/stores`;
const CREATE_STORE_URL = `${API_URL}/store`;

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [storeData, setStoreData] = useState(null);
    const [creatingStore, setCreatingStore] = useState(false);

    const history = useHistory();
    const createStore = async () => {
        setCreatingStore(true);
        try {
            const response = await fetch(CREATE_STORE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const statusCode = response.status;
            if (statusCode === 200) {
                // const responseJSON = await response.json();
                // const storeId = responseJSON.id;
                // TODO: pass storeId to create page
                history.push('/create');
            }
        } catch (error) {
            console.error(error); // eslint-disable-line
        }
        setCreatingStore(false);
    };
    const resumeCreateStore = () => {
        // TODO: pass storeData.id to create page
        history.push('/create');
    };

    useEffect(() => {
        const getAllStores = async () => {
            try {
                setLoading(true);
                const response = await fetch(GET_ALL_STORES_URL, {
                    method: 'GET',
                    credentials: 'include',
                });
                const statusCode = response.status;
                if (statusCode === 200) {
                    const responseJSON = await response.json();
                    // * IMPORTANT: COCO v1 only have 1 store per client
                    if (responseJSON.length > 0) {
                        // No store created yet
                        const jsonStoreInfo = responseJSON[0];
                        setStoreData({
                            id: jsonStoreInfo._id, // eslint-disable-line
                            buildStage: jsonStoreInfo.build_stage,
                            thumbnail: jsonStoreInfo.thumbnail,
                        });
                    }
                    // TODO: get store data needs to be implemented after create store
                    // TODO: create store needs default thumbnail and stuff
                } else if (statusCode === 401 || statusCode === 404) {
                    history.push('/login');
                } else {
                    throw new Error(response.statusText);
                }
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };


        getAllStores();
    }, [history]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <BodyWrapper>
                <Page pageTitle="Store Status">
                    <div
                        className="flex flex-column flex-vertical-center full-width full-height"
                    >
                        {
                            storeData === null ? (
                                <>
                                    <header
                                        className="page-sub-title home-page-subtitle"
                                    >
                                        No stores created yet!
                                    </header>
                                    <div className="home-page-button-container">
                                        <SubmitButton
                                            buttonText="START CREATING"
                                            buttonStyle={null}
                                            submitting={creatingStore}
                                            onClick={createStore}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="home-page-image-container">
                                        <img
                                            alt="store preview"
                                            src={storeData.thumbnail}
                                        />
                                    </div>
                                    <div className="home-page-button-container">
                                        <SubmitButton
                                            buttonText="RESUME CREATING"
                                            buttonStyle={null}
                                            submitting={creatingStore}
                                            onClick={resumeCreateStore}
                                        />
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Page>
            </BodyWrapper>
            <Footer hasSubmitButton={false} />
        </>
    );
};

export default HomePage;
