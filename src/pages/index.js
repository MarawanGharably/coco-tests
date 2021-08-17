import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import keys from "../_keys.json";
import {getUserStores} from "../APImethods";
import {setStoreData} from "../store/actions";
import Loader from "../components/loader/Loader";
import Layout from "../components/layouts/Layout";
import RecordsList from "../components/RecordsList";
import StoreThumbnail from '../components/StoreThumbnail'

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


    if (loading) return <Loader />;


    return (
        <Layout >
            <section className='' style={{color:'#fff', textAlign: 'center', margin:'4em 0 4.3em'}}>
                <h1 style={{marginBottom: '0rem'}}>Welcome To COCO</h1>
                <h4 style={{lineHeight: '1.3', fontWeight: '100'}}>Below Are Your Stores</h4>
            </section>

            {
                HomePageStore.stores
                    ? (<RecordsList
                        records={HomePageStore.stores}
                        recordComponent={StoreThumbnail}
                        className='storesList mx-2'
                    />)
                    : (<h4>There are no stores for this client</h4>)
            }
        </Layout>
    );
};




