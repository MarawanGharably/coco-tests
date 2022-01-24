import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import StoreLayout from '../../components/layouts/StoreLayout';
import SubmitStatusMessage from '../../components/ReduxForms/SubmitStatusMessage';
import FormWithActionBtns from '../../components/ReduxForms/commonUI/FormWithActionBtns';
import { Select, FileInput, NumberSelector } from '../../components/ReduxForms/_formFields';
import { Row, Col } from 'react-bootstrap';
import { getStoreFonts, updateStoreFonts } from '../../APImethods';


let FontsPage = ({ initialize, ...props }) => {
	const router = useRouter();
	const [storeDataLoaded, setStoreData] = useState(false);
	const [status, setStatus] = useState({});
	const [fontOptions, setFontOptions] = useState([]);
	const [fetchedFontFiles, setFetchedFontFiles] = useState(null);
	const { id: storeId } = router.query;

	useEffect(() => {
		storeId &&
		getStoreFonts(storeId)
			.then((res) => {
				setStoreData(true);
				setFetchedFontFiles(res.font_files);

				setFontOptions(
					Object.entries(res.font_files).map(([item]) => {
						return { value: item, label: item };
					}),
				);

				initialize({
					default_font: {
						name: res.fonts?.default_font?.name || Object.keys(res.font_files)[0],
						size: res.fonts?.default_font?.size >= 0 ? res.fonts.default_font.size : 1,
					},
				});
			})
			.catch((err) => console.log(err));
	}, [storeId]);


	const onSubmit = (values) => {
		const { font_files: filesToUpload = [], ...formValues } = values;

		const uploadedFiles = filesToUpload.reduce((acc, item) => ({
			...acc, [item.filename]: { filename: item.filename, content: item.content },
		}), {});

		const font_files = { ...fetchedFontFiles, ...uploadedFiles };

		return updateStoreFonts(storeId, { font_files, fonts: formValues })
			.then((res) => {
				setStatus({ success: true, message: 'Fonts Updated Successfully' });

				setTimeout(() => {
					router.push(`/store/product-tagging/?id=${storeId}`);
				}, 2000);
			})
			.catch((err) => {
				console.log('err', err);
				setStatus({
					error: true,
					message: err.data?.error_message || 'Fonts updated failed',
				});
			});
	};


	return (
		<StoreLayout title='Fonts'>
			<SubmitStatusMessage status={status} />

			<FormWithActionBtns dataLoaded={storeDataLoaded} onSubmit={onSubmit}
								fieldsWrapperStyle={{ maxWidth: '40em' }} {...props}>
				<Row className='mt-3'>
					<Col sm={6}>
						<Field name='font_files' label='Upload Font' component={FileInput} placeholder='Upload Font' multiple accept='.TTF, .OTF, .EOT' />
					</Col>
					<Col sm={6}>
						<Field name='default_font.name' label='Default Font' placeholder='Select Font' mode='dark' component={Select} options={fontOptions} />
					</Col>
					<Col sm={6}>
						<Field name='default_font.size' label='Font Size' mode='dark' component={NumberSelector} min={5}/>
					</Col>
				</Row>
			</FormWithActionBtns>
		</StoreLayout>
	);
};


const validate = ({ default_font }) => {
	const errors = {};

	if (!default_font?.name || default_font?.name === undefined) {
		errors.default_font = { ...errors.default_font || {}, name: 'Choose Default Font' };
	}
	if (!default_font?.size || default_font?.size === undefined) {
		errors.default_font = { ...errors.default_font || {}, size: 'Choose Default Size' };
	}

	return errors;
};

export default reduxForm({
	form: 'FontsForm',
	validate,
})(FontsPage);
