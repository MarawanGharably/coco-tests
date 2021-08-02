import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import keys from "../_keys.json";
import {getUserStores} from "../APImethods";
import {setStoreData} from "../store/actions";
import Loader from "../components/loader/Loader";
import Layout from "../components/layouts/Layout";
import StoresList from "../components/HomePage/StoresList";


export default function HomePage(){
    const [loading, setLoading] = useState(true);
    const HomePageStore = useSelector(store => store.HomePageStore);
    const dispatch = useDispatch();
    

    useEffect(() => {
        // always clear session store id on homepage
        sessionStorage.removeItem(keys.SESSION_STORE_ID);


        getUserStores()
            .then((clientStoreDataResponse) => {
                setLoading(false);
                dispatch(setStoreData({
                    stores: clientStoreDataResponse,
                }));
            }).catch((err) => console.error(err));
        dispatch(setStoreData({ pageHeaderTitle: '' }));
    }, []);




    if (loading) {
        return <Loader />;
    }

    return (
        <Layout title="Your Stores">
            {
                HomePageStore.stores
                    ? (<StoresList stores={HomePageStore.stores} />)
                    : (
                        <header className="page-sub-title">
                            There are no stores for this client
                        </header>
                    )
            }
        </Layout>
    );
};




