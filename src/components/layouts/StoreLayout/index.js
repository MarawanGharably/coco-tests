import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import SideBarMenu from '../_common/SideBarMenu';
import HeaderMenu from '../_common/HeaderMenu';
import Layout from '../Layout';
import styles from './storeLayout.module.scss';

const cookies = new Cookies();

//TODO: remove dev env validation for 'Content Hotspots' when development is finished


export default function StoreLayout({ title, subTitle, meta = {}, className = '', children }) {
	const { isEnabled } = useSelector((state) => state['productLibrary']);
	const user = useSelector((state) => state.user);
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const { id: storeId } = router.query;
	const storeBasePath = `/store`;
	const isDevEnv = process.browser && ['127.0.0.1:3000', 'features.develop.obsessvr.com'].includes(window?.location?.host);
	const pp_access_cookies = cookies.get('PP_ACCESS');
	const store_pp_access = pp_access_cookies?.find((item) => item == storeId) || isEnabled;

	useEffect(() => {
		setMounted(true);
	}, []);

	const links = [
		//{label:'Welcome Screen', url:`${storeBasePath}/welcome`  },
		// {label:'Product Pop Up', url:`${storeBasePath}/popup` },
		// {label:'Section Selector', url: `${storeBasePath}/selectors` },

		//General Tab: Only for Obsess users
		...(user?.isObsessUser
			? [
				{
					label: 'General',
					url: ``,
					children: [
						{ label: 'Store Info', url: `${storeBasePath}/storeinfo/?id=${storeId}` },
						{ label: 'Icons', url: `${storeBasePath}/icons/?id=${storeId}` },
						{ label: 'Locale', url: `${storeBasePath}/locale/?id=${storeId}` },
					],
				},
				{
					label: 'Styling',
					url: ``,
					children: [
						{ label: 'Fonts', url: `${storeBasePath}/fonts/?id=${storeId}` },
					],
				},
			]
			: []),

		{
			label: 'Hotspots',
			children: [
				{ label: 'Product Tagging', url: `${storeBasePath}/product-tagging/?id=${storeId}`},
				//Temporary keep it visible only on dev and FB env
				...(isDevEnv
					? [{ label: 'Content Hotspots', url: `${storeBasePath}/content-hotspots/?id=${storeId}`}]
					: []),
				...(store_pp_access
					? [{ label: 'Product Placement', url: `${storeBasePath}/product-placement/?id=${storeId}`}]
					: []),
			],
		},
		// {label:'Navigation Arrows', url:'/'},
		// {label:'Product Data', url:'/'},
	];

	if (!meta?.title) meta.title = 'COCO: Store Editing';
	return (
		<Layout meta={meta} fluid={true} showNavBar={false} className={`${styles.cmp} ${className}`}>
			<Row>
				<Layout.LeftSidebar>
					{mounted && user?._id && <SideBarMenu links={links} />}
				</Layout.LeftSidebar>

				<Layout.ContentArea style={{ minHeight: '100vh', display: 'flex', flexFlow: 'column' }}>
					<HeaderMenu />
					{title && <h1 className={styles.title}>{title}</h1>}
					{subTitle && (<h6 className={styles.subTitle}>{subTitle}</h6>)}

					{children}
				</Layout.ContentArea>
			</Row>
		</Layout>
	);
}
