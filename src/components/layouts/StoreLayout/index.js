import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SideBarMenu from '../_common/SideBarMenu';
import HeaderMenu from '../_common/HeaderMenu';
import Layout from "../Layout";
import styles from './storeLayout.module.scss';


export default function StoreLayout({ title, subTitle, meta={}, className = '', children }) {
    const user = useSelector(state => state.user);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { id: storeId } = router.query;
    const storeBasePath = `/store`;

    useEffect(() => {
        setMounted(true);
    }, [])

    const links = [
        //{label:'Welcome Screen', url:`${storeBasePath}/welcome`  },
        // {label:'Product Pop Up', url:`${storeBasePath}/popup` },
        // {label:'Section Selector', url: `${storeBasePath}/selectors` },
        
        { label: 'Hotspots',
          children: [
              {label: 'Product Tagging', url:`${storeBasePath}/product-tagging/?id=${storeId}`},
              // {label: 'Content Hotspots', url:`${storeBasePath}/content-hotspots/?id=${storeId}`},
              {label: 'Product Placement', url:`${storeBasePath}/product-placement/?id=${storeId}`},
          ]
        },
        // {label:'Navigation Arrows', url:'/'},
        // {label:'Product Data', url:'/'},
    ];

    //Only for Obsess users
    if(user?.isObsessUser){
        links.unshift( {
            label: 'General',
            url: ``,
            children: [
                {label: 'Store Info', url: `${storeBasePath}/storeinfo/?id=${storeId}`},
                // {label:'Icons', url:`${storeBasePath}/icons/?id=${storeId}`},
                {label:'Locale', url:`${storeBasePath}/locale/?id=${storeId}`}
            ]
        });
    }


    if(!meta?.title) meta.title = 'COCO: Store Editing';
    return (
        <Layout meta={meta} fluid={true} showNavBar={false} className={`${styles.cmp} ${className}`}>
            <Row>
                <Layout.LeftSidebar >
                    {mounted && user?._id && <SideBarMenu links={links}/>}
                </Layout.LeftSidebar>


                <Layout.ContentArea style={{minHeight:'100vh', display:'flex', flexFlow:'column'}}>
                        <HeaderMenu />
                        {title && (<h1 className={styles.title}>{title}</h1>)}
                        {subTitle && <h6 className={styles.subTitle}>{subTitle}</h6>}

                        {children}
                </Layout.ContentArea>
            </Row>
        </Layout>
    );
}