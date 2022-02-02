import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { reduxForm, Field } from 'redux-form';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import StoreLayout from '../../components/layouts/StoreLayout';
import SubmitStatusMessage from '../../components/ReduxForms/SubmitStatusMessage';
import FormWithActionBtns from '../../components/ReduxForms/commonUI/FormWithActionBtns';
import { FileInput, SelectWithUploader } from '../../components/ReduxForms/_formFields';
import { getStoreIcons, updateStoreIcons } from '../../APImethods';
import Section from '../../components/Section';
import { formURL } from '../../utils';


//TODO: awaiting for backend fix. Empty string is still a value





let IconsPage = ({ initialize, ...props }) => {
	const router = useRouter();
	const formData = useSelector((state) => state.form.IconsPage?.values);
	const [storeDataLoaded, setStoreData] = useState(false);
	const [status, setStatus] = useState({});
	const [customOptions, setCustomOptions] = useState([]);
	const [defaultOptions, setDefaultOptions] = useState([]);
	const { id: storeId } = router.query;


	//New Icon Options. Re-calculated when new file uploaded
	const newIconOptions = useMemo(() => {
		const filesToUpload = formData?.['_helper_image_uploader'];
		const size = filesToUpload ? Object.keys(filesToUpload).length : 0;
		if (size > 0) {
			return Object.values(filesToUpload).map((item) => ({
				value: item?.filename,
				label: (<img style={{ width: '20px' }} src={item?.content} />),
			}));
		} else return [];
	}, [formData?.['_helper_image_uploader']]);


	useEffect(() => {
		storeId && getStoreIcons(storeId)
			.then((res) => {
				console.log(' -- API res', res);
				setStoreData(true);

				setDefaultOptions((Object.entries(res.default_icons).map(([fileName, item]) => {
						return {
							value: fileName,
							label: (<img style={{ width: '20px' }} src={item.path} />),
						}
					})
				));
				//Custom options made of a set of uploaded files
				setCustomOptions(Object.entries(res.store_icon_files).map(([fileName, item]) => {
					return {
							value: fileName,
							label: (<img style={{ width: '20px' }} src={formURL(item.url)} />),
						}
					})
				);


				const mapFileInputValue = (fieldName, res) => {
					const iconFile = res.store_icon_files[res.icons?.[fieldName]?.name];
					if(iconFile){
						const url = formURL(iconFile?.url);
						const name = url.split('/').pop();
						return {
							name: name,
							filename: res.icons?.favicon?.name,
							url,
						};
					}else return false;
				};

				initialize({
					product_hotspot_icon: { name: res.icons.product_hotspot_icon?.name || 'hotspot_icon_light' },
					product_hotspot_icon_hover: { name: res.icons.product_hotspot_icon_hover?.name || 'hotspot_icon_light' },
					video_hotspot_icon: { name: res.icons.video_hotspot_icon?.name || 'hotspot_icon_light' },
					video_hotspot_icon_hover: { name: res.icons.video_hotspot_icon_hover?.name || 'hotspot_icon_light' },
					image_hotspot_icon: { name: res.icons.image_hotspot_icon?.name || 'hotspot_icon_light' },
					image_hotspot_icon_hover: { name: res.icons.image_hotspot_icon_hover?.name || 'hotspot_icon_light' },
					text_hotspot_icon: { name: res.icons.text_hotspot_icon?.name || 'hotspot_icon_light' },
					text_hotspot_icon_hover: { name: res.icons.text_hotspot_icon_hover?.name || 'hotspot_icon_light' },
					music_icon_play: { name: res.icons.music_icon_play?.name || 'volume_on' },
					music_icon_pause: { name: res.icons.music_icon_pause?.name || 'volume_off' },
					cart_icon: { name: res.icons.cart_icon?.name || 'bag_icon_light' },
					scene_selector_icon: { name: res.icons.scene_selector_icon?.name || 'hamburger_icon_light' },

					//File Inputs has different mapping
					favicon: { name: mapFileInputValue('favicon', res) },
				});
			})
			.catch((err) => console.log(err));
	}, [storeId]);

	const onSubmit = (values) => {
		let { _helper_image_uploader, ...formValues } = values;

		//Icon fields, new files.
		const filesToUpload = _helper_image_uploader ? Object.values(_helper_image_uploader) : [];

		//favicon (input file) has new file?
		if (formValues.favicon?.name?.content) {
			//add to upload list
			filesToUpload.push(formValues.favicon.name);
			//map to option format
			formValues.favicon = { ...formValues.favicon || {}, name: formValues.favicon.name.filename };
		}else{
			//TODO: awaiting for backend fix. Empty string is still a value
			if(!formValues.favicon?.name || formValues.favicon?.name === undefined) formValues.favicon.name =''; //remove
		}


		return updateStoreIcons(storeId, formValues, filesToUpload)
			.then((res) => {
				setStatus({ success: true, message: 'Icons Updated Successfully' });

				setTimeout(() => {
					router.push(`/store/locale/?id=${storeId}`);
				}, 2000);

			})
			.catch((err) => {
				console.log('err', err);
				setStatus({
					error: true,
					message: err.data?.error_message || 'Icons update failed',
				});
			});
	};


	const options = [...defaultOptions, ...customOptions, ...newIconOptions];

	return (
		<StoreLayout title='Icons'>
			<SubmitStatusMessage status={status} />


			<FormWithActionBtns dataLoaded={storeDataLoaded} onSubmit={onSubmit}
								fieldsWrapperStyle={{ maxWidth: '40em' }}{...props}>

				<Section title='Hotspots'>
					<IconField name='product_hotspot_icon.name' label='Choose Product Hotspot' options={options} />
					<IconField name='product_hotspot_icon_hover.name' label='Choose Product Hotspot Hover'
							   options={options} />
					<IconField name='video_hotspot_icon.name' label='Choose Video Hotspot' options={options} />
					<IconField name='video_hotspot_icon_hover.name' label='Choose Video Hotspot Hover'
							   options={options} />
					<IconField name='image_hotspot_icon.name' label='Choose Image Hotspot' options={options} />
					<IconField name='image_hotspot_icon_hover.name' label='Choose Image Hotspot Hover'
							   options={options} />
					<IconField name='text_hotspot_icon.name' label='Choose Text Hotspot' options={options} />
					<IconField name='text_hotspot_icon_hover.name' label='Choose Text Hotspot Hover'
							   options={options} />
				</Section>

				<Section title='Store Icons'>
					<IconField name='music_icon_play.name' label='Music Icon - Play' options={options} />
					<IconField name='music_icon_pause.name' label='Music Icon - Pause' options={options} />
					<IconField name='cart_icon.name' label='Cart Icon' options={options} />
					<IconField name='scene_selector_icon.name' label='Section Selector Icon' options={options} />
				</Section>

				<Row>
					<Col sm={6}>
						<Field
							name='favicon.name'
							label='Favicon'
							placeholder='Upload Favicon'
							accept='.PNG'
							component={FileInput}
						/>
					</Col>
				</Row>
			</FormWithActionBtns>
		</StoreLayout>
	);
};


const IconField = ({ name, label, options }) => {
	return (<Col sm={6}>
		<Field
			name={name}
			label={label}
			component={SelectWithUploader}
			options={options}
		/>
	</Col>);
};


export default reduxForm({
	form: 'IconsPage',
})(IconsPage);
