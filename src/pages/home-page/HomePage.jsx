import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Page from '../../layouts/page-template/Page';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper';
import Footer from '../../layouts/footer/Footer';
import Loader from '../../components/loader/Loader';
import { apiGetClientStores } from '../../utils/apiUtils';
import HomePageStoreItem from './HomePageStoreItem';
import { useHomePageDataStore, HomePageActionEnums, sessionStorageKey } from '../../data-store/home-page-data-store/HomePageDataStore';
import { getStoreThumbnails } from './homepageUtil';
import './_home-page.scss';

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useHomePageDataStore();
    const history = useHistory();

    // always clear session store id on homepage
    sessionStorage.removeItem(sessionStorageKey.STORE_ID);

    useEffect(() => {
        apiGetClientStores()
            .then((clientStoreDataResponse) => {
                getStoreThumbnails(clientStoreDataResponse)
                    .then((storeThumbnailsResponse) => {
                        dispatch({
                            type: HomePageActionEnums.SET_STORE_THUMBNAILS,
                            payload: { storeThumbnails: storeThumbnailsResponse },
                        });
                        dispatch({
                            type: HomePageActionEnums.SET_STORE_DATA,
                            payload: { storeData: clientStoreDataResponse },
                        });
                        setLoading(false);
                    }).catch((err) => console.error(err));
            }).catch((err) => console.error(err));

        dispatch({
            type: HomePageActionEnums.SET_PAGE_HEADER_TITLE,
            payload: { pageHeaderTitle: '' },
        });
    }, [dispatch, history]);

    const setSessionStorageStoreId = (storeId) => {
        sessionStorage.setItem(sessionStorageKey.STORE_ID, storeId);
    };

    const handleEditStore = (storeId) => {
        dispatch({
            type: HomePageActionEnums.SET_SELECTED_STORE_ID,
            payload: { selectedStoreId: storeId },
        });
        setSessionStorageStoreId(storeId);
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
