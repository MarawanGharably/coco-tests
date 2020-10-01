import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Page from '../../layouts/page-template/Page';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper';
import Footer from '../../layouts/footer/Footer';
import Loader from '../../components/loader/Loader';
import { URLS } from '../../utils/urls';
import HomePageStoreItem from './HomePageStoreItem';
import { useHomePageDataStore, HomePageActionEnums } from '../../data-store/home-page-data-store/HomePageDataStore';
import { getStoreThumbnails } from './homepageUtil';
import './_home-page.scss';

const { GET_ALL_STORES_URL } = URLS; // eslint-disable-line

// eslint-disable
const DUMMY_GET_STORES_DATA = [
    { _id: { $oid: '5d5485c5f84ac4280547e78e' }, name: 'storeName1' },
    { _id: { $oid: '5ee27fe5eb151a60be4c28ac' }, name: 'storeName2' },
    { _id: { $oid: '5eebd7dfcc8a96c35c65d225' }, name: 'storeName3' },
];
// eslint-enable

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useHomePageDataStore();
    const history = useHistory();

    useEffect(() => {
        const getAllStores = async () => {
            try {
                setLoading(true);
                const response = DUMMY_GET_STORES_DATA;
                // const response = await fetch(GET_ALL_STORES_URL, {
                //     method: 'GET',
                //     credentials: 'include',
                // });
                const statusCode = 200;
                // const statusCode = response.status;
                if (statusCode === 200) {
                    const storeDataResponse = response;
                    // const storeDataResponse = await response.json();
                    if (storeDataResponse.length > 0) {
                        // for each store, get the first scene thumbnail url
                        getStoreThumbnails(storeDataResponse)
                            .then((res) => dispatch({
                                type: HomePageActionEnums.SET_STORE_THUMBNAILS,
                                payload: { storeThumbnails: res },
                            }));
                        dispatch({
                            type: HomePageActionEnums.SET_STORE_DATA,
                            payload: { storeData: storeDataResponse },
                        });
                    }
                    setLoading(false);
                } else if (statusCode === 401 || statusCode === 404) {
                    history.push('/login');
                } else {
                    throw new Error(response);
                }
                setLoading(false);
            } catch (error) {
                throw new Error(error);
            }
        };

        getAllStores();
    }, [dispatch, history]);

    const handleEditStore = (storeId) => {
        dispatch({
            type: HomePageActionEnums.SET_SELECTED_STORE_ID,
            payload: { selectedStoreId: storeId },
        });
        history.push('/create');
    };

    if (loading) {
        return <Loader />;
    }

    const renderStoresList = () => {
        const { storeData, storeThumbnails } = state;
        let storesList;

        if (storeData && storeThumbnails.length > 0) {
            const thumbnailObjects = storeThumbnails.reduce((obj, item) => (obj[item.storeId] = item.thumbnailUrl, obj), {}); //eslint-disable-line
            storesList = storeData.map((storeInfo) => (
                <HomePageStoreItem
                    key={storeInfo._id.$oid} // eslint-disable-line
                    storeInfo={storeInfo}
                    handleEditStore={handleEditStore}
                    thumbnailUrl={thumbnailObjects[storeInfo._id.$oid]} // eslint-disable-line
                />
            ));
        }
        return storesList;
    };


    return (
        <>
            <BodyWrapper>
                <Page pageTitle="Your Stores">
                    {
                        state.storeData
                            ? (
                                <section className="flex home-page-wrapper">
                                    {renderStoresList()}
                                </section>
                            ) : (
                                <header className="page-sub-title">
                                    There are no stores for this client
                                </header>
                            )
                    }
                </Page>
            </BodyWrapper>
            <Footer hasSubmitButton={false} />
        </>
    );
};

export default HomePage;
