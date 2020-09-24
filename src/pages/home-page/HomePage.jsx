import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Page from '../../layouts/page-template/Page';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper';
import Footer from '../../layouts/footer/Footer';
import Loader from '../../components/loader/Loader';
import { URLS } from '../../utils/urls';
import HomePageStoreItem from './HomePageStoreItem';
import './_home-page.scss';

const { GET_ALL_STORES_URL } = URLS;

// eslint-disable
// const DUMMY_GET_STORES_DATA = [
//     { _id: 'store1', name: 'myStore', thumbnail: 'https://placedog.net/150/150' },
//     { _id: 'store2', name: 'myStore', thumbnail: 'https://placedog.net/150/150' },
//     { _id: 'store3', name: 'myStore', thumbnail: 'https://placedog.net/150/150' },
// ];
// eslint-enable

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState(null);
    const history = useHistory();

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

    const editStore = (id) => { // eslint-disable-line
        // TODO: pass storeData.id to a store being edited
        // history.push('/create');
    };

    if (loading) {
        return <Loader />;
    }

    let storeList = null;
    if (storeData) {
        storeList = storeData.map((storeInfo) => (
            <HomePageStoreItem
                key={storeInfo._id} // eslint-disable-line
                storeInfo={storeInfo}
                editStore={editStore} // eslint-disable-line
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
                            )
                            : (
                                <header
                                    className="page-sub-title"
                                >
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
