import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { apiGetClientStores } from '../../utils/apiUtils';
import { useHomePageDataStore, HomePageActionEnums, sessionStorageKey } from '../../data-store/home-page-data-store/HomePageDataStore';
import { getStoreThumbnails } from './homepageUtil';
import Layout from '../../layouts/Layout';
import StoresList from "./StoresList";

//TODO: remove Page, BodyWrapper

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

    return (<Layout title="Your Stores">
                    {
                        state.storeData
                            ? (<StoresList
                                        storeData={state.storeData}
                                        storeThumbnails={state.storeThumbnails}
                                        handleEditStore={handleEditStore}
                                    />)
                            : (
                                <header className="page-sub-title">
                                    There are no stores for this client
                                </header>
                            )
                    }
                </Layout>);
};




export default HomePage;
