import React, {useEffect, useState} from 'react';
import {getStores} from "../APImethods";
import Loader from "../components/loader/Loader";
import Layout from "../components/layouts/Layout";
import RecordsList from "../components/RecordsList";
import StoreThumbnail from '../components/StoreThumbnail';
import { useSelector } from 'react-redux';


export default function HomePage(){
    const user = useSelector(state => state.user);
    const [stores, setStores] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let controller = new AbortController();

        //Load stores when store.user object fully loaded
        user && getStores()
            .then((clientStoreDataResponse) => {
                //Show store Info page only for Obsess users
                const baseUrl =  user.isObsessUser? '/store/storeinfo':'/store/hotspots';
                clientStoreDataResponse.map(item=>{
                    item.baseUrl = baseUrl;
                })
                setStores(clientStoreDataResponse);
            })
            .catch((err) => console.error(err))
            .finally(()=>{
                setLoading(false);
            });
        return () => controller?.abort();
    }, []);


    if (loading) return <Loader />;



    return (
        <Layout >
            <section className='' style={{color:'#fff', textAlign: 'center', margin:'4em 0 4.3em'}}>
                <h1 style={{marginBottom: '0rem'}}>Welcome To COCO</h1>
                <h4 style={{lineHeight: '1.3', fontWeight: '100'}}>Below Are Your Stores</h4>
            </section>
            {
                stores
                    ? (<RecordsList
                        records={stores}
                        recordComponent={StoreThumbnail}
                        className='storesList mx-2'
                    />)
                    : (<h4 className='text-center'>There are no stores for this client</h4>)
            }
        </Layout>
    );
};




