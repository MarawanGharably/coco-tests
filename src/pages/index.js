import React, {useEffect, useState} from 'react';
import {getStores} from "../APImethods";
import Layout from "../components/layouts/Layout";
import RecordsList from "../components/RecordsList";
import StoreThumbnail from '../components/StoreThumbnail';
import { useSelector } from 'react-redux';
import {Spinner, Row} from "react-bootstrap";



export default function HomePage(){
    const user = useSelector(state => state.user);
    const [stores, setStores] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let controller = new AbortController();

        //Load stores when store.user object fully loaded
        if(user && !stores){
            getStores()
                .then((clientStoreDataResponse) => {
                    //Show store Info page only for Obsess users
                    const baseUrl =  user.isObsessUser? '/store/storeinfo':'/store/product-tagging';
                    clientStoreDataResponse.map(item=>{
                        item.baseUrl = baseUrl;
                    })
                    setStores(clientStoreDataResponse);
                })
                .catch((err) => console.error(err))
                .finally(()=>{
                    setLoading(false);
                });
        }

        return () => controller?.abort();
    }, [user]);





    return (
        <Layout >
            <section className='' style={{color:'#fff', textAlign: 'center', margin:'4em 0 4.3em'}}>
                <h1 style={{marginBottom: '0rem'}}>Welcome To COCO</h1>
                <h4 style={{lineHeight: '1.3', fontWeight: '100'}}>Below Are Your Stores</h4>
            </section>

            {/* Show Loader */}
            {loading && (<Row className='d-flex align-items-center justify-content-center'>
                <Spinner
                    size="lg"
                    animation="border"
                    role="status"
                    variant='info'
                    style={{ display:'flex', alignSelf:'center', marginTop:'10em'}}
            /></Row>)}

            {/* Show records */}
            {!loading && stores && (<RecordsList
                        records={stores}
                        recordComponent={StoreThumbnail}
                        className='storesList mx-2'
                    />)}

            {/* No Records */}
            { !loading && !stores?.[0] && (<h4 className='text-center'>There are no stores for this client</h4>)}
        </Layout>
    );
};




