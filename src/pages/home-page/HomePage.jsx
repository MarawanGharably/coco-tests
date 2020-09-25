import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Page from '../../layouts/page-template/Page';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper';
import Footer from '../../layouts/footer/Footer';
import Loader from '../../components/loader/Loader';
import { URLS } from '../../utils/urls';
import HomePageStoreItem from './HomePageStoreItem';
import { useHomePageData, HomePageActionEnums } from '../../data-store/home-page-data-store/HomePageDataStore';
import './_home-page.scss';

const { GET_ALL_STORES_URL } = URLS;

// eslint-disable
// const DUMMY_GET_STORES_DATA = [
//     { _id: { $oid: 'store1' }, name: 'myStore', thumbnail: 'https://placedog.net/150/150' },
//     { _id: { $oid: 'store2' }, name: 'myStore', thumbnail: 'https://placedog.net/150/150' },
//     { _id: { $oid: 'store3' }, name: 'myStore', thumbnail: 'https://placedog.net/150/150' },
// ];
// eslint-enable

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [storeData, setStoreData] = useState(null);
    const history = useHistory();
    const [, dispatch] = useHomePageData();

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
                    const storeDataResponse = await response.json();
                    if (storeDataResponse.length > 0) {
                        setStoreData(storeDataResponse);
                    }
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
    }, [history]);

    const handleEditStore = (storeId) => {
        dispatch({
            type: HomePageActionEnums.RECEIVE_HOMEPAGE_DATA,
            payload: {
                storeId,
            },
        });
        history.push('/create');
    };

    if (loading) {
        return <Loader />;
    }

    let storeList = null;
    if (storeData) {
        storeList = storeData.map((storeInfo) => (
            <HomePageStoreItem
                key={storeInfo._id.$oid} // eslint-disable-line no-underscore-dangle
                storeInfo={storeInfo}
                handleEditStore={handleEditStore}
            />
        ));
    }

    return (
        <>
            <BodyWrapper>
                <Page pageTitle="Your Stores">
                    {
                        storeData
                            ? (
                                <section className="flex home-page-wrapper">
                                    {storeList}
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
