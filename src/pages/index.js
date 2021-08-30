import React, {useEffect, useState} from 'react';
import {getUserStores} from "../APImethods";
import Loader from "../components/loader/Loader";
import Layout from "../components/layouts/Layout";
import RecordsList from "../components/RecordsList";
import StoreThumbnail from '../components/StoreThumbnail';


export default function HomePage(){
    const [stores, setStores] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let controller = new AbortController();

        getUserStores()
            .then((clientStoreDataResponse) => {
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
                    : (<h4>There are no stores for this client</h4>)
            }
        </Layout>
    );
};



