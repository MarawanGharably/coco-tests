import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import Layout from '../../layouts/Layout';
import StoresList from './StoresList';
import { setStoreData, setSelectedStoreID } from '../../store/actions/homePageActions';
import { getUserStores, getStoreThumbnails } from '../../APImethods/StoreAPI';
import { SESSION_STORE_ID } from '../../_keys.json';

//TODO: remove Page, BodyWrapper

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const HomePageStore = useSelector(store => store.HomePageStore);
    const dispatch = useDispatch();
    const history = useHistory();

    // always clear session store id on homepage
    sessionStorage.removeItem(SESSION_STORE_ID);

    useEffect(() => {
        getUserStores()
            .then((clientStoreDataResponse) => {
                setLoading(false);
                dispatch(setStoreData({
                    stores: clientStoreDataResponse,
                }));
            }).catch((err) => console.error(err));
        dispatch(setStoreData({ pageHeaderTitle: '' }));
    }, [history]);


    const handleEditStore = (storeId) => {
        dispatch(setSelectedStoreID(storeId));

        history.push('/create');
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Layout title="Your Stores">
            {
                HomePageStore.stores
                    ? (
                        <StoresList
                            stores={HomePageStore.stores}
                            handleEditStore={handleEditStore}
                        />
                    )
                    : (
                        <header className="page-sub-title">
                            There are no stores for this client
                        </header>
                    )
            }
        </Layout>
    );
};




export default HomePage;
