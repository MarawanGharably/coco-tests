import React from 'react';
import { Field } from 'redux-form';
import { Form } from 'react-bootstrap';
import Select from '../../_formFields/Select';
import { FileInput } from '../../_formFields';


export default function SelectWithUploader({
   input,
   label,
   options,
   accept,
   placeholder,
   meta: { visited, error, warning },
}) {
	const [mainInputName] =input.name.split('.');
	return (<div>
		<Field
			name={input.name}
			label={label}
			mode='dark'
			component={Select}
			CustomMenuComponent={() => <CustomMenuComponent name={mainInputName}/>}
			options={options}
		/>
		{/* Hidden field used to upload Icons from Select Dropdown list*/}
		<div className='d-none'>
			<Field name={`_helper_image_uploader[${mainInputName}]`} component={FileInput} accept={accept} />
		</div>

	</div>);
}

const CustomMenuComponent = ({name}) => {

	const onClick = () => {
		const el = document.querySelector(`input[name='_helper_image_uploader[${name}]']`);
		el?.click();
	};

	return <div className={`d-flex justify-content-center selectCustomMenu textWithGradient`} onClick={onClick}>
		Upload New Icon
	</div>;
};