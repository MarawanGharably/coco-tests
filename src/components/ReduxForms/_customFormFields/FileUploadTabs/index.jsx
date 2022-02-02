import React from 'react';
import { Field } from 'redux-form';
import { Form, Tabs, Tab } from 'react-bootstrap';
import { Input, FileInput } from '../../_formFields';
import styles from './FileUploadTabs.module.scss';


const FileUploadTabs = ({ input, label, variant='dark', type = '' }) => {
	return (<div className={`${styles.cmp} ${variant ? styles[`${variant}-variant`]:''}`}>
		{label && (<Form.Label>{label}</Form.Label>)}

		<Tabs defaultActiveKey='upload' id='imageDataTabs' className={styles.tabs}>
			<Tab eventKey='upload' title='upload' className={styles['tab-pane']}>
				<Field
					name={`${input.name}.imageFile`}
					component={FileInput}
					accept='image/*'
					placeholder={'Upload ' + (type == 'image' ? 'Image' : 'Video')}
				/>
			</Tab>
			<Tab eventKey='link' title='Link' className={styles['tab-pane']}>
				<Field
					name={`${input.name}.imageURL`}
					placeholder='Paste Link'
					component={Input}
				/>
			</Tab>
		</Tabs>
	</div>);
};

export default FileUploadTabs;